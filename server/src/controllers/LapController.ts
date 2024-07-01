import SQLite from "@/interfaces/SQLite";
import { SocketIO } from "@/interfaces/SocketIO";
import type ITelemetryData from "@/objects/telemetry-data.interface";
import type ILapData from "@/objects/telemetry-data.interface";
import { getDistance } from "@/utils/calculationUtils";

export class LapController {
  private lastLapPackets: ILapData[] = {} as ILapData[];
  private socketIO: SocketIO;
  private previouslyInFinishLineProximity: boolean = false;
  private sqlLite: SQLite;
  private lapNumber: number = 0;

  constructor(socketIO: typeof SocketIO, sqlLite: SQLite) {
    this.socketIO = socketIO;
    this.sqlLite = sqlLite;
  }

  public async handlePacket(packet: ITelemetryData) {
    if (this.checkLap(packet)) {
      // mark lap, calculate lap, and add to lap table in database
      // send lap over socket

      // update last lap packet

      const lapData = {
        timestamp: packet.TimeStamp,
        lapTime: this.calculateLapTime(this.lastLapPackets),
        totalPowerIn: this.getAveragePowerIn(this.lastLapPackets),
        totalPowerOut: this.getAveragePowerOut(this.lastLapPackets),
        netPowerOut: 0,
        distance: this.calculateMotorDistance(this.lastLapPackets, 0), // CHANGE THIS BASED ON ODOMETER/MOTOR INDEX OR CHANGE TO ITERATE
        amphours: 0,
        averagePackCurrent: this.calculateAveragePackCurrent(
          this.lastLapPackets,
        ),
        batterySecondsRemaining: 0,
        averageSpeed: this.calculateAverageLapSpeed(this.lastLapPackets),
      };

      await this.sqlLite.insertLapData(lapData as ILapData);
      this.lastLapPackets = [];
    }
    this.lastLapPackets.push(packet);
  }

  public getLastPacket() {
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
      const vehicleVelocity = packet.KeyMotor[0]?.VehicleVelocity;
      return vehicleVelocity !== undefined ? sum + vehicleVelocity : sum;
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

  public calculateMotorDistance = function (
    packetArray: ITelemetryData[],
    odometerIndex: number,
  ) {
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

  public getAveragePowerIn = function (packetArray: ITelemetryData[]) {
    // If no packets, then no power in
    if (packetArray.length === 0) {
      return 0;
    }

    // Define constants
    const mpptCount = 4;
    const motorCount = 2;

    // Get the sum of the average array power of all MPPTs
    let mpptPowerIn = packetArray
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
    let regenPowerIn = packetArray
      .map((packet) => {
        let regen = 0;
        for (let motor = 0; motor < motorCount; motor++) {
          // let busCurrent = packet['motor' + motor + 'buscurrent'];
          // let busVoltage = packet['motor' + motor + 'busvoltage'];
          let busCurrent = packet.KeyMotor[motor].BusCurrent;
          let busVoltage = packet.KeyMotor[motor].BusVoltage;

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

  public getAveragePowerOut = function (packetArray) {
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
}
