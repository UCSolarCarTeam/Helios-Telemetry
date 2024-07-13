import type { LapController } from "@/controllers/LapController";
import type { SolarMQTTClient } from "@/datasources/SolarMQQTClient/SolarMQTTClient";
import { options } from "@/datasources/SolarMQQTClient/SolarMQTTClient.types";
import { logger } from "@/index";
import type { SQLite } from "@/interfaces/SQLite";
import type { SocketIO } from "@/interfaces/SocketIO";

export interface BackendControllerTypes {
  sqLite: SQLite;
  socketIO: SocketIO;
  lapController: LapController;
  mqtt: SolarMQTTClient;

  establishCarPinging(): void;
  handleCarLatency(carLatency: number): void;
  handlePacketReceive(message: Buffer): void;
}
