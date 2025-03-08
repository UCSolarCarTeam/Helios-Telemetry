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
  public broadcastCarLatency(latency: number) {
    this.io.emit("carLatency", latency);
  }
  public broadcastLapCoords(response: CoordUpdateResponse) {
    this.io.emit("lapCoords", response);
  }
  public initializeSocketListeners(socket: Socket) {
    socket.on("ping", (callback: () => void) => {
      callback();
    });
    socket.on("setLapCoords", (newCoordInfo: CoordInfoUpdate) => {
      const { lat, long, password } = newCoordInfo;
      logger.info("UPDATED COORDS: ");
      logger.info("lat: ", lat, "long: ", long);
      const res =
        this.backendController.lapController.setFinishLineLocation(
          newCoordInfo,
        );

      this.broadcastLapCoords(res);
    });
    socket.on("disconnect", () => {
      logger.info("Client disconnected");
    });
  }
}
export default SocketIO;
