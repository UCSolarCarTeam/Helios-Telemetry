import { type Server, type Socket } from "socket.io";

import type { ITelemetryData } from "@/interfaces/telemetry-data.interface";

export interface SocketIOType {
  broadcastCarLatency(latency: number): void;
  broadcastPacket(packet: ITelemetryData): void;
  initializeSocketListeners(socket: Socket): void;
  io: Server;
}
