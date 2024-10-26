import type { LapController } from "@/controllers/LapController/LapController";

import type { SQLite } from "@/datasources/DynamoDB/SQLite";
import type { SocketIO } from "@/datasources/SocketIO/SocketIO";
import type { SolarMQTTClient } from "@/datasources/SolarMQTTClient/SolarMQTTClient";

import type { ITelemetryData } from "@shared/helios-types";

export interface BackendControllerTypes {
  establishCarPinging(): void;
  handleCarLatency(carLatency: number): void;
  handlePacketReceive(message: ITelemetryData): void;
  lapController: LapController;
  mqtt: SolarMQTTClient;
  socketIO: SocketIO;
  sqLite: SQLite;
}
