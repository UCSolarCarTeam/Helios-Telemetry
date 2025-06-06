import { type Server, type Socket } from "socket.io";

import type { ILapData, ITelemetryData } from "@shared/helios-types";

export interface SocketIOType {
  broadcastCarLatency(latency: number): void;
  broadcastLapData(lapData: ILapData): void;
  broadcastLapComplete(): void;
  broadcastPacket(packet: ITelemetryData): void;
  initializeSocketListeners(socket: Socket): void;
  io: Server;
}
