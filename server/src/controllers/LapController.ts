import { type SocketIO } from "@/interfaces/SocketIO";
import type ITelemetryData from "@/objects/telemetry-data.interface";
import { getDistance } from "@/utils/calculationUtils";

export class LapController {
  private lastLapPacket: ITelemetryData = {} as ITelemetryData;
  private socketIO: SocketIO;
  private previouslyInFinishLineProximity: boolean = false;

  constructor(socketIO: SocketIO) {
    this.socketIO = socketIO;
  }

  public handlePacket(packet: ITelemetryData) {
    if (this.checkLap(packet)) {
      // mark lap, calculate lap, and add to lap table in database
      // send lap over socket

      // update last lap packet
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
}
