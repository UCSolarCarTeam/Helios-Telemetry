import { type Socket } from "socket.io";
import { Server } from "socket.io";

import { logger } from "@/index";
import type ITelemetryData from "@/objects/telemetry-data.interface";
import { httpServer } from "@/server";

class SocketIO {
  io: Server;
  socketObject: Socket | undefined;
  constructor() {
    this.io = new Server(httpServer, {
      cors: {
        origin: "*",
      },
    });
    this.io.on("connection", (socket: Socket) => {
      logger.info("Client connected");
      this.socketObject = initializeSocketListeners(socket);
    });
  }

  public sendPacket(packet: ITelemetryData) {
    this.io.emit("packet", packet);
  }
  public broadcastCarLatency(latency: number) {
    this.io.emit("carLatency", latency);
  }
}
export default SocketIO;

function initializeSocketListeners(socket: Socket) {
  socket.on("disconnect", () => {
    logger.info("Client disconnected");
  });
  socket.on("ping", (callback: () => void) => {
    callback();
  });
  return socket;
}
