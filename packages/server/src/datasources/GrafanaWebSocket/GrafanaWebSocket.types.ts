import type { WebSocketServer } from "ws";

import type { ILapData, ITelemetryData } from "@shared/helios-types";

export interface GrafanaWebSocketType {
  broadcastLapData(lapData: ILapData): void;
  broadcastPacket(packet: ITelemetryData): void;
  wss: WebSocketServer;
}
