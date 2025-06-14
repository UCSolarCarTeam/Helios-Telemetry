import type { IncomingMessage, Server, ServerResponse } from "http";

import type { BackendControllerTypes } from "@/controllers/BackendController/BackendController.types";
import { LapController } from "@/controllers/LapController/LapController";

import DynamoDB from "@/datasources/DynamoDB/DynamoDB";
import { SocketIO } from "@/datasources/SocketIO/SocketIO";
import { SolarMQTTClient } from "@/datasources/SolarMQTTClient/SolarMQTTClient";
import { options } from "@/datasources/SolarMQTTClient/SolarMQTTClient.types";

import { logger } from "@/index";
import { ILapData, type ITelemetryData } from "@shared/helios-types";

//getDriverInfo
export class BackendController implements BackendControllerTypes {
  public dynamoDB: DynamoDB;
  public socketIO: SocketIO;
  public lapController: LapController;
  public mqtt: SolarMQTTClient;
  public carLatency: number;
  constructor(
    httpsServer: Server<typeof IncomingMessage, typeof ServerResponse>,
  ) {
    this.dynamoDB = new DynamoDB(this);
    this.socketIO = new SocketIO(httpsServer, this);
    this.mqtt = new SolarMQTTClient(options, this);
    this.lapController = new LapController(this);
    this.establishCarPinging();
    this.carLatency = 0;
    // this.handleCarLatency();
  }

  public establishCarPinging() {
    // Ping the car every 5 seconds
    this.mqtt.pingTimer(5000);
    // send data to car every 5 seconds
    this.mqtt.telemetryToCar(5000);
  }

  public handleTelemetryToCar(carLatency: number) {
    // Broadcast the car latency to the frontend
    this.socketIO.broadcastCarLatency(carLatency);
    logger.info("Car Latency - receiving: ", carLatency.toString());
  }

  public async handlePacketReceive(message: ITelemetryData) {
    // Insert the packet into the database
    this.dynamoDB.insertPacketData(message);

    // Broadcast the packet to the frontend
    this.socketIO.broadcastPacket(message);

    // Handle the packet in the lap controller
    await this.lapController.handlePacket(message);
  }
}
