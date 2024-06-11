import { type Socket } from "socket.io";
import { Server } from "socket.io";

import type ITelemetryData from "@/objects/telemetry-data.interface";
import { httpServer } from "@/server";
import { createLightweightApplicationLogger } from "@/utils/logger";

const logger = createLightweightApplicationLogger("socket.controller.ts");
class SocketIO {
  io: Server;

  constructor() {
    this.io = new Server(httpServer, {
      cors: {
        origin: "*",
      },
    });
    this.io.on("ping", (callback: () => void) => {
      callback();
    });
  }

  public sendPacket(packet: ITelemetryData) {
    this.io.emit("packet", packet);
  }
  public broadcastCarLatency(latency: number) {
    this.io.emit("CarLatency", latency);
  }
}
export default SocketIO;

export const handleSocketConnection = (socket: Socket) => {
  logger.info("Client connected");

  const packetTimerID = setInterval(() => {
    // TODO: Replace generateFakeTelemetryData() with the real data
    const newPacket = generateFakeTelemetryData();

    // Compare the server logs with the live website data
    logger.info(
      `Battery Average Voltage: ${JSON.stringify(newPacket.Battery.AverageCellVoltage)}V`,
    );
    socket.emit("packet", newPacket);
  }, 2500);

  socket.on("disconnect", () => {
    logger.info("Client disconnected");
    clearInterval(packetTimerID);
  });

  socket.on("print", (data: string) => {
    logger.info(data);
  });
};
