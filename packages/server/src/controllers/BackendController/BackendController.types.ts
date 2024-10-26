import type { LapController } from "@/controllers/LapController/LapController";

import DynamoDB from "@/datasources/DynamoDB/DynamoDB";
import type { SocketIO } from "@/datasources/SocketIO/SocketIO";
import type { SolarMQTTClient } from "@/datasources/SolarMQTTClient/SolarMQTTClient";

import type { ITelemetryData } from "@shared/helios-types";

export interface BackendControllerTypes {
  dynamoDB: DynamoDB;
  establishCarPinging(): void;
  handleCarLatency(carLatency: number): void;
  handlePacketReceive(message: ITelemetryData): void;
  lapController: LapController;
  mqtt: SolarMQTTClient;
}
