import type { WebSocketServer } from "ws";

import type { ILapData, ITelemetryData } from "@shared/helios-types";

export interface WebSocketType {
  broadcastLapData(lapData: ILapData): void;
  broadcastPacket(packet: ITelemetryData): void;
  wss: WebSocketServer;
}
