import type { IncomingMessage, Server, ServerResponse } from "http";
import { type Socket } from "socket.io";
import { Server as SocketIOServer } from "socket.io";

import { type BackendController } from "@/controllers/BackendController/BackendController";

import { type SocketIOType } from "@/datasources/SocketIO/SocketIO.types";

import { logger } from "@/index";
import type { ITelemetryData } from "@shared/helios-types";

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
    });
  }

  public broadcastPacket(packet: ITelemetryData) {
    this.io.emit("packet", packet);
  }
  public broadcastCarLatency(latency: number) {
    this.io.emit("carLatency", latency);
  }
  public initializeSocketListeners(socket: Socket) {
    socket.on("ping", (callback: () => void) => {
      callback();
    });
    socket.on("disconnect", () => {
      logger.info("Client disconnected");
    });
  }
}
export default SocketIO;
