import { type BackendController } from "@/controllers/BackendController/BackendController";
import { type LapControllerType } from "@/controllers/LapController/LapController.types";

import type {
  CoordInfoUpdate,
  Coords,
} from "@/interfaces/setCoordinateData.interface";
import type {
  ILapData,
  ITelemetryData,
} from "@/interfaces/telemetry-data.interface";

import { getDistance } from "@/utils/lapCalculations";
import { createLightweightApplicationLogger } from "@/utils/logger";

const logger = createLightweightApplicationLogger("LapController.ts");
export class LapController implements LapControllerType {
  public lastLapPackets: ITelemetryData[] = [] as ITelemetryData[];
  public previouslyInFinishLineProximity: boolean = false;
  public lapNumber: number = 0;
  public finishLineLocation: Coords = {
    lat: 51,
    long: 101,
  };
  backendController: BackendController;

  constructor(backendController: BackendController) {
    this.backendController = backendController;
  }

  public setFinishLineLocation(
    newCoordInfo: CoordInfoUpdate,
  ): Coords | { error: string } {
    logger.info(JSON.stringify(newCoordInfo));
    const { lat, long, password } = newCoordInfo;
    if (password !== process.env.LAP_POSITION_PASSWORD) {
      logger.error("Invalid Password");
      logger.info("Password: ", password);
      return { error: "Invalid Password" };
    }
    // strip the latitude and longitude from the string
    if (
      (LapController.isDMS(lat) || LapController.isDMM(lat)) &&
      (LapController.isDMS(long) || LapController.isDMM(long))
    ) {
      const { lat: latitude, long: longitude } =
        LapController.convertToDecimalDegrees(lat, long);
      this.finishLineLocation = {
        lat: latitude,
        long: longitude,
      };
      logger.info("Finish Line Location Set: ", this.finishLineLocation);
      return this.finishLineLocation;
    }
    logger.error("Invalid Coordinates");
    return { error: "Invalid Coordinates" };
  }

  // Helper private to detect if input is in DMS (Degrees, Minutes, Seconds)
  private static isDMS(input: string): boolean {
    return /°|'|"/.test(input);
  }

  // Helper function to detect if input is in DMM (Degrees and Decimal Minutes)
  private static isDMM(input: string): boolean {
    return /^\d+\s\d+\.\d+/.test(input);
  }

  // Convert DMS format to Decimal Degrees
  private static dmsToDecimal(input: string): number {
    const regex = /(\d+)[°\s](\d+)['\s](\d+(\.\d+)?)["\s]?([NSEW])/;
    const match = input.match(regex);

    if (!match) {
      throw new Error("Invalid DMS format");
    }

    const degrees = parseFloat(match[1]);
    const minutes = parseFloat(match[2]);
    const seconds = parseFloat(match[3]);
    const direction = match[5];

    let decimal = degrees + minutes / 60 + seconds / 3600;

    if (direction === "S" || direction === "W") {
      decimal *= -1;
    }

    return decimal;
  }

  // Convert DMM format to Decimal Degrees
  private static dmmToDecimal(input: string): number {
    const regex = /(\d+)\s(\d+\.\d+)\s?([NSEW])/;
    const match = input.match(regex);

    if (!match) {
      throw new Error("Invalid DMM format");
    }

    const degrees = parseFloat(match[1]);
    const minutes = parseFloat(match[2]);
    const direction = match[3];

    let decimal = degrees + minutes / 60;

    if (direction === "S" || direction === "W") {
      decimal *= -1;
    }

    return decimal;
  }
  // Main private that converts latitude and longitude to Decimal Degrees (DD)
  private static convertToDecimalDegrees(lat: string, long: string): Coords {
    let latitude: number;
    let longitude: number;

    // Trim leading and trailing spaces from input
    lat = lat.trim();
    long = long.trim();

    // Check if the format is DMS or DMM and convert accordingly
    if (LapController.isDMS(lat)) {
      latitude = LapController.dmsToDecimal(lat);
    } else if (LapController.isDMM(lat)) {
      latitude = LapController.dmmToDecimal(lat);
    } else {
      latitude = parseFloat(lat);
    }

    if (LapController.isDMS(long)) {
      longitude = LapController.dmsToDecimal(long);
    } else if (LapController.isDMM(long)) {
      longitude = LapController.dmmToDecimal(long);
    } else {
      longitude = parseFloat(long);
    }

    return { lat: latitude, long: longitude };
  }

  public async handlePacket(packet: ITelemetryData) {
    if (this.checkLap(packet) && this.lastLapPackets.length > 0) {
      // mark lap, calculate lap, and add to lap table in database
      // send lap over socket

      // update last lap packet
      const amphoursValue = this.lastLapPackets[this.lastLapPackets.length - 1]
        .Battery.PackAmphours as number;
      const averagePackCurrent = this.calculateAveragePackCurrent(
        this.lastLapPackets,
      );

      const lapData: ILapData = {
        ampHours: amphoursValue, // NOTE THIS IS THE LATEST BATTERY PACK AMPHOURS
        averagePackCurrent: averagePackCurrent,
        averageSpeed: this.calculateAverageLapSpeed(this.lastLapPackets),
        batterySecondsRemaining: this.getSecondsRemainingUntilChargedOrDepleted(
          amphoursValue,
          averagePackCurrent,
        ),
        distance: this.getDistanceTravelled(this.lastLapPackets), // CHANGE THIS BASED ON ODOMETER/MOTOR INDEX OR CHANGE TO ITERATE
        lapTime: this.calculateLapTime(this.lastLapPackets),
        netPowerOut: this.netPower(this.lastLapPackets),
        timeStamp: packet.TimeStamp,
        totalPowerIn: this.getAveragePowerIn(this.lastLapPackets),
        totalPowerOut: this.getAveragePowerOut(this.lastLapPackets),
      };

      await this.backendController.sqLite.insertLapData(lapData);
      this.lastLapPackets = [];
    }
    this.lastLapPackets.push(packet);
  }

  public getLastPacket(): ITelemetryData[] {
    return this.lastLapPackets;
  }

  //checks if lap has been acheived
  private checkLap(packet: ITelemetryData) {
    const carLocation = {
      lat: 51,
      long: 101,
    };

    const inProximity =
      getDistance(
        carLocation.lat,
        carLocation.long,
        this.finishLineLocation.lat,
        this.finishLineLocation.long,
      ) <= 0.01;
    let lapHappened = false;
    if (!this.previouslyInFinishLineProximity && inProximity) {
      lapHappened = true;
    }

    this.previouslyInFinishLineProximity = inProximity;
    return lapHappened;
  }

  public calculateLapTime(lastLapPackets: ITelemetryData[]) {
    if (lastLapPackets.length === 0) {
      return 0;
    }
    return (
      lastLapPackets[lastLapPackets.length - 1].TimeStamp -
      lastLapPackets[0].TimeStamp
    );
  }

  public calculateAverageLapSpeed(lastLapPackets: ITelemetryData[]): number {
    if (lastLapPackets.length === 0) {
      return 0;
    }

    const sumAverageLapSpeed = lastLapPackets.reduce(
      (sum: number, packet: ITelemetryData) => {
        const vehicleVelocityMotor0 = packet.KeyMotor[0]?.VehicleVelocity;
        const vehicleVelocityMotor1 = packet.KeyMotor[1]?.VehicleVelocity;

        return vehicleVelocityMotor0 !== undefined
          ? vehicleVelocityMotor1 !== undefined
            ? sum + (vehicleVelocityMotor0 + vehicleVelocityMotor1) / 2
            : sum
          : sum;
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

  public checkIfMotorReset(
    motorOdometer: number,
    motorDistanceTraveledSession: number,
  ): boolean {
    let motorReset = false;
    if (
      Math.round(motorOdometer) === 0 &&
      Math.abs(motorOdometer - motorDistanceTraveledSession) > 1.0
    ) {
      motorReset = true;
    }

    return motorReset;
  }

  public calculateMotorDistance(
    packetArray: ITelemetryData[],
    odometerIndex: number,
  ): number {
    // The Motor's Odometer resets every time a motor trips or the car power cycles
    let totalDistanceTraveled = 0;
    let motorDistanceTraveledSession = 0;

    for (let i = 0; i < packetArray.length; i++) {
      // Check if the motor had reset, keep a tally of the distance travelled
      if (
        this.checkIfMotorReset(
          packetArray[i].MotorDetails[odometerIndex].Odometer,
          motorDistanceTraveledSession,
        )
      ) {
        totalDistanceTraveled += motorDistanceTraveledSession;
      }

      motorDistanceTraveledSession =
        packetArray[i].MotorDetails[odometerIndex].Odometer;
    }
    totalDistanceTraveled += motorDistanceTraveledSession;
    // Remove the initial distance
    totalDistanceTraveled -=
      packetArray[0].MotorDetails[odometerIndex].Odometer;
    // Convert to kilometers (odometer reports as meters)
    totalDistanceTraveled /= 1000;

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
            packet.MPPT[mppt].ArrayVoltage * packet.MPPT[mppt].ArrayCurrent;
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
          const busCurrent = packet.KeyMotor[motor].BusCurrent;
          const busVoltage = packet.KeyMotor[motor].BusVoltage;

          // Filter out any values with busCurrent >= 0
          if (busCurrent >= 0) {
            continue;
          }

          regen += busCurrent * busVoltage;
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
          sum + curr.Battery.PackCurrent * curr.Battery.PackVoltage,
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
}
