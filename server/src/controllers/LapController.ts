import { SocketIO } from "@/interfaces/SocketIO";
import ITelemetryData from "@/objects/telemetry-data.interface";
import { getDistance } from "@/utils/calculationUtils";

export class LapController {
  private lastLapPacket: ITelemetryData = {} as ITelemetryData;
  private socketIO: SocketIO;

  constructor(socketIO: SocketIO) {
    this.socketIO = socketIO;
  }

  public handlePacket(packet: ITelemetryData) {
    const lapAchieved = this.checkLap(packet);

    if (lapAchieved) {
      //mark lap and add to lap table in database

      //update last lap packet
      this.lastLapPacket = packet;
    }
  }

  public getLastPacket() {
    return this.lastLapPacket;
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

    if (
      getDistance(
        carLocation.lat,
        carLocation.long,
        finishlineLocation.lat,
        finishlineLocation.long,
      ) <= 10
    ) {
      return true;
    }
    return false;
  }
}
