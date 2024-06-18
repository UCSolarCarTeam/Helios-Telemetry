import { type Socket } from "socket.io";
import { Server } from "socket.io";

import { logger } from "@/index";
import type ITelemetryData from "@/objects/telemetry-data.interface";
import { httpServer } from "@/server";

export class SocketIO {
  io: Server;
  constructor() {
    this.io = new Server(httpServer, {
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
  private initializeSocketListeners(socket: Socket) {
    socket.on("ping", (callback: () => void) => {
      callback();
    });
    socket.on("disconnect", () => {
      logger.info("Client disconnected");
    });
  }
}
export default SocketIO;
