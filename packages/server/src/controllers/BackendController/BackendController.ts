import type { IncomingMessage, Server, ServerResponse } from "http";

import type { BackendControllerTypes } from "@/controllers/BackendController/BackendController.types";
import { LapController } from "@/controllers/LapController/LapController";

import DynamoDB from "@/datasources/DynamoDB/DynamoDB";
import { SocketIO } from "@/datasources/SocketIO/SocketIO";
import { SolarMQTTClient } from "@/datasources/SolarMQTTClient/SolarMQTTClient";
import { options } from "@/datasources/SolarMQTTClient/SolarMQTTClient.types";

import { logger } from "@/index";
import { type ITelemetryData } from "@shared/helios-types";

export class BackendController implements BackendControllerTypes {
  public dynamoDB: DynamoDB;
  public socketIO: SocketIO;
  public lapController: LapController;
  public mqtt: SolarMQTTClient;
  constructor(
    httpsServer: Server<typeof IncomingMessage, typeof ServerResponse>,
  ) {
    this.dynamoDB = new DynamoDB(this);
    this.socketIO = new SocketIO(httpsServer, this);
    this.mqtt = new SolarMQTTClient(options, this);
    this.lapController = new LapController(this);
    this.establishCarPinging();
  }

  public establishCarPinging() {
    // Ping the car every 5 seconds
    this.mqtt.pingTimer(5000);
  }

  // This isn't being called anywhere?
  public handleCarLatency(carLatency: number) {
    // Broadcast the car latency to the frontend
    this.socketIO.broadcastCarLatency(carLatency);
    logger.info("Car Latency: ", carLatency.toString());
  }

  public async handlePacketReceive(message: ITelemetryData) {
    // Insert the packet into the database
    this.dynamoDB.insertPacketData(message);

    // Broadcast the packet to the frontend
    this.socketIO.broadcastPacket(message);
    this.socketIO.broadcastLapCoords(this.lapController.finishLineLocation);

    // Handle the packet in the lap controller
    await this.lapController.handlePacket(message);
  }
}
