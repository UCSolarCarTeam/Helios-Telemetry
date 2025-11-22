import { type BackendController } from "@/controllers/BackendController/BackendController";
import { type LapControllerType } from "@/controllers/LapController/LapController.types";

import {
  calculateOffset,
  convertToDecimalDegrees,
} from "@/utils/lapCalculations";
import { createLightweightApplicationLogger } from "@/utils/logger";

import {
  FINISH_LINE_LOCATION,
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
  public day1 = new Date(Date.UTC(2025, 6, 3, 14, 0, 0)); // July 3rd 2025, 2:00:00 PM (in UTC)
  public day2 = new Date(Date.UTC(2025, 6, 4, 13, 0, 0)); // July 4th 2025, 3:00:00 PM (in UTC)
  public day3 = new Date(Date.UTC(2025, 6, 5, 13, 0, 0)); // July 5th 2025, 3:00:00 PM (in UTC)
  public raceDates = [this.day1, this.day2, this.day3];

  public raceInfo: IRaceInfo = {
    distance: 0,
    lapNumber: 0,
    prevTime: 0,
    raceDates: this.raceDates,
    raceDay: 0,
    timeLeft: this.totalTime,
    totalDistance: 0,
  };

  public finishLineLocation: Coords = FINISH_LINE_LOCATION;

  public lapDebounceLocation: Coords = {
    // debounce so that it doesnt just count every checklap as a function
    lat:
      this.finishLineLocation.lat -
      calculateOffset(0.01, this.finishLineLocation.lat).latOffset,
    long:
      this.finishLineLocation.long -
      calculateOffset(0.01, this.finishLineLocation.lat).longOffset,
  };

  private timerInterval: NodeJS.Timeout;
  backendController: BackendController;

  public startTimers() {
    this.timerInterval = setInterval(() => {
      this.raceInfo.timeLeft -= 1000;

      // reset race info
      if (this.raceInfo.timeLeft <= 0) {
        this.cleanUp(); // clean up timer interval
        this.raceInfo.totalDistance += this.raceInfo.distance;
        this.raceInfo.distance = 0;
        this.raceInfo.timeLeft = this.totalTime; // reset race info
        this.raceInfo.prevTime = 0; // reset previous time calculated back to 0
        this.raceInfo.raceDay += 1;
        this.startRace(); // check for new day
      }

      if (this.raceInfo.raceDay >= 3) {
        this.raceInfo.timeLeft = this.totalTime; // reset back to start after 3 days
      }
    }, 1000); // update the time every 1 second.
  }

  constructor(backendController: BackendController) {
    this.backendController = backendController;
  }

  public cleanUp() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  public calculateRaceDistance(motor0Speed: number, motor1Speed: number) {
    const vehicleVelocity = calculateVehicleVelocity(motor0Speed, motor1Speed);

    const currentTime = Date.now();
    if (this.raceInfo.prevTime !== 0 && this.raceInfo.raceDay < 3) {
      const dTime = (currentTime - this.raceInfo.prevTime) / (3600 * 1000); // convert ms to hr
      this.raceInfo.distance = this.raceInfo.distance + vehicleVelocity * dTime;
    }
    this.raceInfo.prevTime = currentTime;
  }

  public startRace() {
    const currentTime = new Date().getTime();
    const raceStarting = this.raceDates.some((raceDate) => {
      const timeDifference = Math.abs(currentTime - raceDate.getTime());
      return timeDifference <= 1000; // true if within one second tolerance (can be changed)
    });

    if (raceStarting) {
      this.startTimers();
    }
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

  // this function is for calling when lap completes via lap digital being true
  public async handleLapData(lapData: ILapData) {
    await this.backendController.socketIO.broadcastLapData(lapData);
    await this.backendController.grafanaWebSocket.broadcastLapData(lapData);
    await this.backendController.dynamoDB.insertLapData(lapData);
  }

  // this function is for calling when lap completes via geofence
  public async handleGeofenceLap(rfid: string, timestamp: number) {
    await this.backendController.dynamoDB.insertIntoGpsLapCountTable(
      rfid,
      timestamp,
    );
  }

  public async handlePacket(packet: ITelemetryData) {
    const motorDetails0 = packet.MotorDetails0.VehicleVelocity;
    const motorDetails1 = packet.MotorDetails1.VehicleVelocity;
    if (this.raceInfo.raceDay >= 3)
      // also include if !packet.B3.RaceMode
      this.cleanUp(); // clean up after the last race day
    else if (this.timerInterval == null) this.startRace(); // also include if packet.B3.RaceMode == true

    if (
      this.timerInterval != null &&
      this.raceInfo.timeLeft > 0 &&
      this.raceInfo.timeLeft < this.totalTime
    ) {
      this.calculateRaceDistance(motorDetails0, motorDetails1);
    }

    if (this.checkLap(packet) && this.lastLapPackets.length > 5) {
      logger.info("lap completed for geofence");
      this.handleGeofenceLap(packet.Pi.Rfid, packet.TimeStamp);
    }

    if (
      //TEST: commented out this condition for broadcasting lap data to grafana
      // packet.B3.LapDigital &&
      this.lastLapPackets.length > 5
    ) {
      await this.backendController.socketIO.broadcastLapComplete();
      // mark lap, calculate lap, and add to lap table in database
      // send lap over socket

      // update last lap packet
      const amphoursValue = this.lastLapPackets[this.lastLapPackets.length - 1]
        ?.Battery.PackAmphours as number;
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
          netPowerOut: this.netPower(this.lastLapPackets),
          timeStamp: packet.TimeStamp,
          totalPowerIn: this.getAveragePowerIn(this.lastLapPackets),
          totalPowerOut: this.getAveragePowerOut(this.lastLapPackets),
        },
        timestamp: packet.TimeStamp,
      };

      logger.info("Lap data inserted into database: ", lapData);

      this.handleLapData(lapData);
      this.lastLapPackets = [];
    }

    this.backendController.socketIO.broadcastRaceInfo(this.raceInfo);
    this.lastLapPackets.push(packet);
  }

  public getLastPacket(): ITelemetryData[] {
    return this.lastLapPackets;
  }

  private checkDebounce(packet: ITelemetryData) {
    const inDebounceZone =
      haversineDistance(
        packet.Telemetry.GpsLatitude,
        packet.Telemetry.GpsLongitude,
        this.lapDebounceLocation.lat,
        this.lapDebounceLocation.long,
      ) <= 0.01; // 0.01 km = 10 m

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
      ) <= 0.03; // 0.01 km = 10 m

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
          packet.MotorDetails0.MotorVelocity as number,
          packet.MotorDetails1.MotorVelocity as number,
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
      const packCurrent = packet.Battery?.PackCurrent;
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
    if (packetArray.length < 2) return 0;

    let totalDistance = 0;
    let lastOdometer: number | undefined = undefined;

    for (const packet of packetArray) {
      const motor = packet[`MotorDetails${motorIndex}`];
      const odometer = motor?.Odometer;

      if (typeof odometer !== "number") continue;

      if (lastOdometer === undefined) {
        lastOdometer = odometer;
        continue;
      }

      if (odometer >= lastOdometer) {
        totalDistance += odometer - lastOdometer;
      } else {
        // odometer reset detected
      }

      lastOdometer = odometer;
    }

    // convert m to km
    return totalDistance / 1000;
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

    // Get the sum of the average array power of all MPPTs
    const mpptPowerIn = packetArray
      .map((packet) => {
        let arrayPower = 0;
        for (let mppt = 0; mppt < mpptCount; mppt++) {
          // Array Power = Array Voltage * Array Current
          // arrayPower += packet['mppt' + mppt + 'arrayvoltage'] *
          //               packet['mppt' + mppt + 'arraycurrent'];
          arrayPower +=
            (packet.MPPT?.Mppt0Ch0ArrayVoltage as number) *
            (packet.MPPT?.Mppt0Ch1ArrayVoltage as number);
          arrayPower +=
            (packet.MPPT?.Mppt1Ch0ArrayVoltage as number) *
            (packet.MPPT?.Mppt1Ch1ArrayVoltage as number);
          arrayPower +=
            (packet.MPPT?.Mppt2Ch0ArrayVoltage as number) *
            (packet.MPPT?.Mppt2Ch1ArrayVoltage as number);
          arrayPower +=
            (packet.MPPT?.Mppt3Ch0ArrayVoltage as number) *
            (packet.MPPT?.Mppt3Ch1ArrayVoltage as number);
        }
        return arrayPower;
      })
      .reduce((sum, curr) => sum + curr / packetArray.length, 0);

    // Get the sum of the regen of all motors
    const regenPowerSum = packetArray.reduce((sum, packet) => {
      let regenPower = 0;

      const motorDetails = [packet.MotorDetails0, packet.MotorDetails1];

      for (const motor of motorDetails) {
        const current = motor?.BusCurrent;
        const voltage = motor?.BusVoltage;

        if (
          typeof current === "number" &&
          typeof voltage === "number" &&
          current < 0
        ) {
          regenPower += current * voltage;
        }
      }

      return sum + regenPower;
    }, 0);

    const avgRegenPower = regenPowerSum / packetArray.length;

    return Math.abs(mpptPowerIn + avgRegenPower);
  }

  public getAveragePowerOut(packetArray: ITelemetryData[]): number {
    // If no packets, then no power out
    if (packetArray.length === 0) {
      return 0;
    }

    return Math.abs(
      packetArray.reduce(
        (sum, curr) =>
          sum + curr.Battery.PackCurrent * curr.Battery.PackVoltage,
        0,
      ) / packetArray.length,
    );
  }

  public netPower(packetArray: ITelemetryData[]): number {
    if (!packetArray || packetArray.length === 0) {
      return 0;
    }
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
