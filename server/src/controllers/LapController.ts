import type SQLite from "@/interfaces/SQLite";
import type { SocketIO } from "@/interfaces/SocketIO";
import type {
  ILapData,
  ITelemetryData,
} from "@/objects/telemetry-data.interface";
import { getDistance } from "@/utils/calculationUtils";

export class LapController {
  private lastLapPackets: ITelemetryData[] = {} as ITelemetryData[];
  private socketIO: SocketIO;
  private previouslyInFinishLineProximity: boolean = false;
  private sqlLite: SQLite;
  private lapNumber: number = 0;

  constructor(socketIO: SocketIO, sqlLite: SQLite) {
    this.socketIO = socketIO;
    this.sqlLite = sqlLite;
  }

  public async handlePacket(packet: ITelemetryData) {
    if (this.checkLap(packet)) {
      // mark lap, calculate lap, and add to lap table in database
      // send lap over socket

      // update last lap packet
      const amphoursValue = this.lastLapPackets[-1].Battery
        .PackAmphours as number;
      const averagePackCurrent = this.calculateAveragePackCurrent(
        this.lastLapPackets,
      );

      const lapData: ILapData = {
        timeStamp: packet.TimeStamp,
        totalPowerIn: this.getAveragePowerIn(this.lastLapPackets),
        totalPowerOut: this.getAveragePowerOut(this.lastLapPackets),
        netPowerOut: this.netPower(this.lastLapPackets),
        distance: this.getDistanceTravelled(this.lastLapPackets), // CHANGE THIS BASED ON ODOMETER/MOTOR INDEX OR CHANGE TO ITERATE
        ampHours: amphoursValue, // NOTE THIS IS THE LATEST BATTERY PACKAMPHOURS
        averagePackCurrent: averagePackCurrent,
        batterySecondsRemaining: this.getSecondsRemainingUntilChargedOrDepleted(
          amphoursValue,
          averagePackCurrent,
        ),
        averageSpeed: this.calculateAverageLapSpeed(this.lastLapPackets),
        lapTime:
          this.lastLapPackets[-1].TimeStamp - this.lastLapPackets[0].TimeStamp,
      };

      await this.sqlLite.insertLapData(lapData);
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

    const finishlineLocation = {
      lat: 51.1,
      long: 100.2,
    };
    const inProximity =
      getDistance(
        carLocation.lat,
        carLocation.long,
        finishlineLocation.lat,
        finishlineLocation.long,
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

    const sumAverageLapSpeed = lastLapPackets.reduce((sum, packet) => {
      const vehicleVelocityMotor0 = packet.KeyMotor[0]?.VehicleVelocity;
      const vehicleVelocityMotor1 = packet.KeyMotor[1]?.VehicleVelocity;

      return vehicleVelocityMotor0 !== undefined
        ? vehicleVelocityMotor1 !== undefined
          ? sum + (vehicleVelocityMotor0 + vehicleVelocityMotor1) / 2
          : sum
        : sum;
    }, 0);

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

  public checkIfMotorReset = function (
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
  };

  public calculateMotorDistance = (
    packetArray: ITelemetryData[],
    odometerIndex: number,
  ): number => {
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
  };

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

  public getAveragePowerIn = function (packetArray: ITelemetryData[]) {
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
  };

  public getAveragePowerOut = function (packetArray: ITelemetryData[]) {
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
  };

  public netPower(packetArray: ITelemetryData[]) {
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
