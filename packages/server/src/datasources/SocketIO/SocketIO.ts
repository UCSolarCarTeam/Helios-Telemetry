import type { IncomingMessage, Server, ServerResponse } from "http";
import { type Socket } from "socket.io";
import { Server as SocketIOServer } from "socket.io";

import { type BackendController } from "@/controllers/BackendController/BackendController";

import { type SocketIOType } from "@/datasources/SocketIO/SocketIO.types";

import { createLightweightApplicationLogger } from "@/utils/logger";

import type {
  CoordInfoUpdate,
  CoordUpdateResponse,
  ILapData,
  IRaceInfo,
  ITelemetryData,
} from "@shared/helios-types";

const logger = createLightweightApplicationLogger("SocketIO.ts");
export class SocketIO implements SocketIOType {
  io: SocketIOServer;
  backendController: BackendController;
  constructor(
    httpsServer: Server<typeof IncomingMessage, typeof ServerResponse>,
    backendController: BackendController,
  ) {
    this.backendController = backendController;
    this.io = new SocketIOServer(httpsServer, {
      cors: {
        origin: "*",
      },
    });

    this.io.on("connection", (socket: Socket) => {
      logger.info("Client connected");
      this.initializeSocketListeners(socket);
      const lapCoords = this.backendController.lapController.finishLineLocation;
      this.broadcastLapCoords(lapCoords);
    });
  }

  public broadcastPacket(packet: ITelemetryData) {
    this.io.emit("packet", packet);
  }
  public broadcastLapData(lapData: ILapData) {
    this.io.emit("lapData", lapData);
  }
  public broadcastLapComplete() {
    this.io.emit("lapComplete");
  }
  public broadcastCarLatency(latency: number) {
    this.io.emit("carLatency", latency);
  }
  public broadcastLapCoords(response: CoordUpdateResponse) {
    this.io.emit("lapCoords", response);
  }
  public broadcastCarDisconnect(data: { message: string }) {
    this.io.emit("carDisconnect", data); // Emit the event to all connected clients
  }
  public broadcastCarConnect(data: { message: string }) {
    this.io.emit("carConnect", data); // Emit the event to all connected clients
  }
  public broadcastRaceInfo(raceInfo: IRaceInfo) {
    this.io.emit("raceInfo", raceInfo);
  }

  public initializeSocketListeners(socket: Socket) {
    socket.on("ping", (callback: () => void) => {
      callback();
    });
    socket.on(
      "setLapCoords",
      (
        newCoordInfo: CoordInfoUpdate,
        callback?: (response: CoordUpdateResponse) => void,
      ) => {
        const { lat, long } = newCoordInfo;

        logger.info("UPDATED COORDS: ");
        logger.info("lat: ", lat, "long: ", long);
        const res =
          this.backendController.lapController.setFinishLineLocation(
            newCoordInfo,
          );
        // Only broadcast if successful
        if (!("error" in res)) {
          this.broadcastLapCoords(res);
        }

        if (typeof callback === "function") {
          callback(res);
        }
      },
    );
    socket.on("disconnect", () => {
      logger.info("Client disconnected");
    });
  }
}
export default SocketIO;
