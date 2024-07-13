import type { LapController } from "@/controllers/LapController";
import type { SolarMQTTClient } from "@/datasources/SolarMQTTClient/SolarMQTTClient";
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
