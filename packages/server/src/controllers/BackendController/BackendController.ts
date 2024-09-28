import type { IncomingMessage, Server, ServerResponse } from "http";

import type { BackendControllerTypes } from "@/controllers/BackendController/BackendController.types";
import { LapController } from "@/controllers/LapController/LapController";

import { SQLite } from "@/datasources/SQLite/SQLite";
import { SocketIO } from "@/datasources/SocketIO/SocketIO";
import { SolarMQTTClient } from "@/datasources/SolarMQTTClient/SolarMQTTClient";
import { options } from "@/datasources/SolarMQTTClient/SolarMQTTClient.types";

import { type ITelemetryData } from "@/interfaces/telemetry-data.interface";

import { createLightweightApplicationLogger } from "@/utils/logger";

const logger = createLightweightApplicationLogger("BackendController.ts");

export class BackendController implements BackendControllerTypes {
  public sqLite: SQLite;
  public socketIO: SocketIO;
  public lapController: LapController;
  public mqtt: SolarMQTTClient;
  constructor(
    httpsServer: Server<typeof IncomingMessage, typeof ServerResponse>,
  ) {
    this.sqLite = new SQLite("./database.sqlite", this);
    this.socketIO = new SocketIO(httpsServer, this);
    this.mqtt = new SolarMQTTClient(options, this);
    this.lapController = new LapController(this);
    this.establishCarPinging();
  }

  public establishCarPinging() {
    // Ping the car every 5 seconds
    this.mqtt.pingTimer(5000);
  }

  public handleCarLatency(carLatency: number) {
    // Broadcast the car latency to the frontend
    this.socketIO.broadcastCarLatency(carLatency);
    logger.info("Car Latency: ", carLatency.toString());
  }

  public async handlePacketReceive(message: ITelemetryData) {
    // Insert the packet into the database
    await this.sqLite.insertPacketData(message);

    // Broadcast the packet to the frontend
    this.socketIO.broadcastPacket(message);

    // Handle the packet in the lap controller
    await this.lapController.handlePacket(message);
  }
}
