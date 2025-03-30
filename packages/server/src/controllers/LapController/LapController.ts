import { type BackendController } from "@/controllers/BackendController/BackendController";
import { type LapControllerType } from "@/controllers/LapController/LapController.types";

import {
  calculateOffset,
  convertToDecimalDegrees,
} from "@/utils/lapCalculations";
import { createLightweightApplicationLogger } from "@/utils/logger";

import {
  calculateVehicleVelocity,
  haversineDistance,
} from "@shared/helios-types";
import type {
  CoordInfoUpdate,
  CoordUpdateResponse,
  Coords,
  ILapData,
  IRaceInfo,
  ITelemetryData,
} from "@shared/helios-types";

const logger = createLightweightApplicationLogger("LapController.ts");
/**
 *
 * There is some general documentation on this file in the docs, but it is not very detailed
 *
 * this controller is responsible for handling lap data, including:
 * - setting the finish line location (do we even do this anymore)
 * - handling sending lap data to dynamo based on if a lap has been finished or not
 * - also has other helper functions that are used to calculate the lap data
 *
 * basically the main thing function is handlePacket() which creates a lapData object
 * and sends it to dynamo only when a lap has been completed
 *
 * then handleLapData() is called to broadcast the lap data to the frontend for real time changes
 * as well as to insert the lap data into the dynamo database
 */
export class LapController implements LapControllerType {
  public lastLapPackets: ITelemetryData[] = [] as ITelemetryData[];
  public previouslyInFinishLineProximity = false;
  public passedDebouncedCheckpoint = false;
  public totalTime = 3600 * 1000 * 8; // 1000 ms/sec * 3600 sec/hr * 8 hr
  // public raceStartTime = new Date("2025-08-01-13:00");
  // public myTime = new Date("2025-08-01-13:00");
  // public myTimeEnd = new Date("2025-08-01-21:00");

  public raceInfo: IRaceInfo = {
    distance: 0,
    lapNumber: 0,
    prevTime: 0,
    raceDay: 0,
    timeLeft: this.totalTime,
  };

  public finishLineLocation: Coords = {
    lat: 37.001949324,
    long: -86.366554059,
  };

  public lapDebounceLocation: Coords = {
    lat:
      this.finishLineLocation.lat -
      calculateOffset(0.05, this.finishLineLocation.lat).latOffset,
    long:
      this.finishLineLocation.long -
      calculateOffset(0.05, this.finishLineLocation.lat).longOffset,
  };

  private timerInterval: NodeJS.Timeout;
  private checkRaceEndInterval: NodeJS.Timeout;

  backendController: BackendController;

  public startTimers() {
    this.timerInterval = setInterval(() => {
      this.raceInfo.timeLeft -= 1000;
    }, 1000); // update the time every 1 second.

    this.checkRaceEndInterval = setInterval(() => {
      if (this.raceInfo.timeLeft <= 0) {
        this.resetRaceInfo(); // or do myTime > myTimeEnd
        this.incrementRaceDay();
      }

      if (this.raceInfo.raceDay >= 3) {
        this.raceInfo.timeLeft = 0;
      }
    }, 1000); // check for end of race every second
  }

  constructor(backendController: BackendController) {
    this.backendController = backendController;
    this.startTimers();
  }

  public cleanUp() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (this.checkRaceEndInterval) {
      clearInterval(this.checkRaceEndInterval);
      this.checkRaceEndInterval = null;
    }
  }

  public resetRaceInfo() {
    this.raceInfo.timeLeft = this.totalTime;
  }

  public incrementRaceDay() {
    this.raceInfo.raceDay += 1;
  }

  public calculateRaceDistance(motorDetails0: number, motorDetails1: number) {
    const vehicleVelocity = calculateVehicleVelocity(
      motorDetails0,
      motorDetails1,
    );

    // calculate distance
    const currentTime = Date.now();
    if (this.raceInfo.prevTime !== 0) {
      const dTime = (currentTime - this.raceInfo.prevTime) / (3600 * 1000); // convert ms to hr
      this.raceInfo.distance = this.raceInfo.distance + vehicleVelocity * dTime;
    }
    this.raceInfo.prevTime = currentTime;
  }

  public setFinishLineLocation(
    newCoordInfo: CoordInfoUpdate,
  ): CoordUpdateResponse {
    logger.info(JSON.stringify(newCoordInfo));
    const { lat, long, password } = newCoordInfo;
    if (password !== process.env.LAP_POSITION_PASSWORD) {
      logger.error("Invalid Password: " + password);
      return { error: "Invalid Password", invalidFields: ["password"] };
    }
    try {
      const newFinishLinelocation = convertToDecimalDegrees(lat, long);
      this.finishLineLocation = newFinishLinelocation;
      logger.info("Finish Line Location Set: ", this.finishLineLocation);
      return this.finishLineLocation;
    } catch (e) {
      logger.error(
        "Error: " + (e as Error).message + " must be in DD, DMM, or DMS format",
      );
      return {
        error:
          "Invalid Coordinates: " +
          (e as Error).message +
          " must be in DD, DMM, or DMS format",
        invalidFields: [(e as Error).message as keyof CoordInfoUpdate],
      };
    }
  }

  public async handleLapData(lapData: ILapData) {
    await this.backendController.socketIO.broadcastLapData(lapData);
    await this.backendController.dynamoDB.insertLapData(lapData);
  }

  public async handlePacket(packet: ITelemetryData) {
    if (false) this.cleanUp();
    else if (this.timerInterval == null || this.checkRaceEndInterval == null)
      this.startTimers();

    if (this.checkLap(packet) && this.lastLapPackets.length > 0) {
      await this.backendController.socketIO.broadcastLapComplete();
      // mark lap, calculate lap, and add to lap table in database
      // send lap over socket

      // update last lap packet
      const amphoursValue = this.lastLapPackets[this.lastLapPackets.length - 1]
        ?.Battery.BatteryPack.PackAmphours as number;
      const averagePackCurrent = this.calculateAveragePackCurrent(
        this.lastLapPackets,
      );

      const lapData: ILapData = {
        Rfid: packet.Pi.Rfid,
        data: {
          ampHours: amphoursValue, // NOTE THIS IS THE LATEST BATTERY PACK AMPHOURS
          averagePackCurrent: averagePackCurrent,
          averageSpeed: this.calculateAverageLapSpeed(this.lastLapPackets),
          batterySecondsRemaining:
            this.getSecondsRemainingUntilChargedOrDepleted(
              amphoursValue,
              averagePackCurrent,
            ),
          distance: this.getDistanceTravelled(this.lastLapPackets), // CHANGE THIS BASED ON ODOMETER/MOTOR INDEX OR CHANGE TO ITERATE
          energyConsumed: this.getEnergyConsumption(this.lastLapPackets),
          lapTime: this.calculateLapTime(this.lastLapPackets),
          netPowerOut: 1, // CHANGE THIS BASED ON CORRECTED NET POWER VALUE!
          timeStamp: packet.TimeStamp,
          totalPowerIn: 1, // CHANGE THIS BASED ON CORRECTED TOTAL POWER VALUE!
          totalPowerOut: this.getAveragePowerOut(this.lastLapPackets),
        },
        timestamp: packet.TimeStamp,
      };

      this.handleLapData(lapData);
      this.lastLapPackets = [];
    }

    const motorDetails0 = packet.MotorDetails0.CurrentRpmValue;
    const motorDetails1 = packet.MotorDetails1.CurrentRpmValue;
    this.calculateRaceDistance(motorDetails0, motorDetails1);
    this.backendController.socketIO.broadcastRaceInfo(this.raceInfo);
    this.lastLapPackets.push(packet);
  }

  public getLastPacket(): ITelemetryData[] {
    return this.lastLapPackets;
  }

  private checkDebounce(packet: ITelemetryData) {
    const carLocation = {
      lat: packet.Telemetry.GpsLatitude,
      long: packet.Telemetry.GpsLongitude,
    };

    const inDebounceZone =
      getDistance(
        carLocation.lat,
        carLocation.long,
        this.lapDebounceLocation.lat,
        this.lapDebounceLocation.long,
      ) <= 0.01;

    if (inDebounceZone && !this.passedDebouncedCheckpoint)
      this.passedDebouncedCheckpoint = true;

    return this.passedDebouncedCheckpoint;
  }

  // checks if lap has been acheived (using geofencing)
  private checkLap(packet: ITelemetryData) {
    const inProximity =
      haversineDistance(
        packet.Telemetry.GpsLatitude,
        packet.Telemetry.GpsLongitude,
        this.finishLineLocation.lat,
        this.finishLineLocation.long,
      ) <= 0.01;

    let lapHappened = false;
    const checkDebounce = this.checkDebounce(packet);

    if (checkDebounce && !this.previouslyInFinishLineProximity && inProximity) {
      lapHappened = true;
      this.raceInfo.lapNumber += 1;
      this.passedDebouncedCheckpoint = false;
    }

    this.previouslyInFinishLineProximity = inProximity;
    return lapHappened;
  }

  // returns milliseconds between all packets in last lap
  public calculateLapTime(lastLapPackets: ITelemetryData[]) {
    if (lastLapPackets.length === 0) {
      return 0;
    }
    const startTime = new Date(lastLapPackets[0]?.TimeStamp).getTime();
    const endTime = new Date(
      lastLapPackets[lastLapPackets.length - 1]?.TimeStamp,
    ).getTime();
    return endTime - startTime;
  }

  public calculateAverageLapSpeed(lastLapPackets: ITelemetryData[]): number {
    if (lastLapPackets.length === 0) {
      return 0;
    }

    const sumAverageLapSpeed = lastLapPackets.reduce(
      (sum: number, packet: ITelemetryData) => {
        const vehicleVelocity = calculateVehicleVelocity(
          packet.MotorDetails0.CurrentRpmValue as number,
          packet.MotorDetails1.CurrentRpmValue as number,
        );
        return vehicleVelocity !== undefined ? sum + vehicleVelocity : sum;
      },
      0,
    );

    return sumAverageLapSpeed / lastLapPackets.length;
  }

  public calculateAveragePackCurrent(lastLapPackets: ITelemetryData[]): number {
    if (lastLapPackets.length === 0) {
      return 0;
    }

    const sumAveragePack = lastLapPackets.reduce((sum, packet) => {
      const packCurrent = packet.Battery?.BatteryPack.PackCurrent;
      return packCurrent !== undefined ? sum + packCurrent : sum;
    }, 0);

    return sumAveragePack / lastLapPackets.length;
  }

  // public checkIfMotorReset(
  //   motorOdometer: number,
  //   motorDistanceTraveledSession: number,
  // ): boolean {
  //   let motorReset = false;
  //   if (
  //     Math.round(motorOdometer) === 0 &&
  //     Math.abs(motorOdometer - motorDistanceTraveledSession) > 1.0
  //   ) {
  //     motorReset = true;
  //   }

  //   return motorReset;
  // }

  public calculateMotorDistance(
    packetArray: ITelemetryData[],
    motorIndex: number,
  ): number {
    // The Motor's Odometer resets every time a motor trips or the car power cycles
    let totalDistanceTraveled = 0;

    for (let i = 0; i < packetArray.length; i++) {
      totalDistanceTraveled += (packetArray[i]?.[`MotorDetails${motorIndex}`]
        ?.CurrentRpmValue *
        0.15 *
        0.5) as number;

      // Check if the motor had reset, keep a tally of the distance travelled
      // if (
      //   this.checkIfMotorReset(
      //     packetArray[i]?.[`MotorDetails${odometerIndex}`]?.Odometer as number,
      //     motorDistanceTraveledSession,
      //   )
      // ) {
      //   totalDistanceTraveled += motorDistanceTraveledSession;
      // }

      // motorDistanceTraveledSession = packetArray[i]?.[
      //   `MotorDetails${odometerIndex}`
      // ]?.Odometer as number;
    }
    // totalDistanceTraveled += motorDistanceTraveledSession;
    // // Remove the initial distance
    // totalDistanceTraveled -= packetArray[0]?.[`MotorDetails${odometerIndex}`]
    //   ?.Odometer as number;
    // // Convert to kilometers (odometer reports as meters)
    // totalDistanceTraveled /= 1000;

    return totalDistanceTraveled;
  }

  public getDistanceTravelled(packetArray: ITelemetryData[]) {
    if (packetArray.length === 0) {
      return 0;
    }
    const motor0DistanceTravelledTotal = this.calculateMotorDistance(
      packetArray,
      0,
    );
    const motor1DistanceTravelledTotal = this.calculateMotorDistance(
      packetArray,
      1,
    );

    return (motor0DistanceTravelledTotal + motor1DistanceTravelledTotal) / 2;
  }

  public getAveragePowerIn(packetArray: ITelemetryData[]): number {
    // If no packets, then no power in
    if (packetArray.length === 0) {
      return 0;
    }

    // Define constants
    const mpptCount = 4;
    const motorCount = 2;

    // Get the sum of the average array power of all MPPTs
    const mpptPowerIn = packetArray
      .map((packet) => {
        let arrayPower = 0;
        for (let mppt = 0; mppt < mpptCount; mppt++) {
          // Array Power = Array Voltage * Array Current
          // arrayPower += packet['mppt' + mppt + 'arrayvoltage'] *
          //               packet['mppt' + mppt + 'arraycurrent'];
          arrayPower +=
            (packet.MPPT0?.ArrayVoltage as number) *
            (packet.MPPT0?.ArrayCurrent as number);
          arrayPower +=
            (packet.MPPT1?.ArrayVoltage as number) *
            (packet.MPPT1?.ArrayCurrent as number);
          arrayPower +=
            (packet.MPPT2?.ArrayVoltage as number) *
            (packet.MPPT2?.ArrayCurrent as number);
          arrayPower +=
            (packet.MPPT3?.ArrayVoltage as number) *
            (packet.MPPT3?.ArrayCurrent as number);
        }
        return arrayPower;
      })
      .reduce((sum, curr) => sum + curr / packetArray.length, 0);

    // Get the sum of the regen of all motors
    const regenPowerIn = packetArray
      .map((packet) => {
        let regen = 0;
        for (let motor = 0; motor < motorCount; motor++) {
          // let busCurrent = packet['motor' + motor + 'buscurrent'];
          // let busVoltage = packet['motor' + motor + 'busvoltage'];
          const busCurrent = packet.KeyMotor[motor]?.BusCurrent;
          const busVoltage = packet.KeyMotor[motor]?.BusVoltage;

          // Filter out any values with busCurrent >= 0
          if (busCurrent && busCurrent >= 0) {
            continue;
          }

          regen += (busCurrent as number) * (busVoltage as number);
        }
        return regen;
      })
      .reduce((sum, curr) => sum + curr / packetArray.length, 0);

    return Math.abs(mpptPowerIn + regenPowerIn);
  }

  public getAveragePowerOut(packetArray: ITelemetryData[]): number {
    // If no packets, then no power out
    if (packetArray.length === 0) {
      return 0;
    }

    return Math.abs(
      packetArray.reduce(
        (sum, curr) =>
          sum +
          curr.Battery.BatteryPack.PackCurrent *
            curr.Battery.BatteryPack.PackVoltage,
        0,
      ) / packetArray.length,
    );
  }

  public netPower(packetArray: ITelemetryData[]): number {
    return (
      this.getAveragePowerIn(packetArray) - this.getAveragePowerOut(packetArray)
    );
  }

  public getSecondsRemainingUntilChargedOrDepleted(
    averagePackCurrent: number,
    packAmpHours: number,
  ): number {
    if (averagePackCurrent === 0) {
      return -1;
    }
    let amphoursLeft = 0;
    if (averagePackCurrent >= 0) {
      amphoursLeft = packAmpHours;
    } else {
      amphoursLeft = 165.6 - packAmpHours;
    }
    const hoursUntilChargedOrDepleted =
      amphoursLeft / Math.abs(averagePackCurrent);
    const secondsUntilChargedOrDepleted = hoursUntilChargedOrDepleted * 3600;
    if (isNaN(secondsUntilChargedOrDepleted)) {
      return -1;
    } else {
      return Math.round(secondsUntilChargedOrDepleted);
    }
  }

  public getEnergyConsumption(packetArray: ITelemetryData[]): number {
    const lapTime = this.calculateLapTime(packetArray);
    const netPowerOut = this.netPower(packetArray);

    return lapTime * netPowerOut;
  }
}
