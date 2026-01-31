import { DatabaseService } from "db";

import type { LapController } from "@/controllers/LapController/LapController";

import type { SocketIO } from "@/datasources/SocketIO/SocketIO";
import type { SolarMQTTClient } from "@/datasources/SolarMQTTClient/SolarMQTTClient";

import type { ITelemetryData } from "@shared/helios-types";

export interface BackendControllerTypes {
  timescaleDB: DatabaseService;
  establishCarPinging(): void;
  handleTelemetryToCar(carLatency: number): void;
  handlePacketReceive(message: ITelemetryData): void;
  lapController: LapController;
  mqtt: SolarMQTTClient;
  socketIO: SocketIO;
}
