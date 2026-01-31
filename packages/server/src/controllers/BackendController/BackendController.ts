import { DatabaseService } from "db";
import type { IncomingMessage, Server, ServerResponse } from "http";

import type { BackendControllerTypes } from "@/controllers/BackendController/BackendController.types";
import { LapController } from "@/controllers/LapController/LapController";

import { SocketIO } from "@/datasources/SocketIO/SocketIO";
import { SolarMQTTClient } from "@/datasources/SolarMQTTClient/SolarMQTTClient";
import { options } from "@/datasources/SolarMQTTClient/SolarMQTTClient.types";

import { logger } from "@/index";
import { type ITelemetryData } from "@shared/helios-types";

//getDriverInfo
export class BackendController implements BackendControllerTypes {
  public socketIO: SocketIO;
  public lapController: LapController;
  public mqtt: SolarMQTTClient;
  public timescaleDB: DatabaseService;
  public carLatency: number;
  constructor(
    httpsServer: Server<typeof IncomingMessage, typeof ServerResponse>,
  ) {
    this.socketIO = new SocketIO(httpsServer, this);
    this.mqtt = new SolarMQTTClient(options, this);
    this.lapController = new LapController(this);
    this.timescaleDB = DatabaseService.getInstance();
    this.establishCarPinging();
    this.carLatency = 0;
    this.initializeDatabase();
    // this.handleCarLatency();
  }

  private async initializeDatabase() {
    try {
      await this.timescaleDB.initialize();
      logger.info("Database connection established successfully");
    } catch (error) {
      logger.error("Failed to initialize database:", error);
      // Optionally throw or handle gracefully based on your needs
      // For non-critical features, you might continue without database
      // throw error;
    }
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
    this.timescaleDB.insertPacketData(message);

    // Broadcast the packet to the frontend
    this.socketIO.broadcastPacket(message);

    // Handle the packet in the lap controller
    await this.lapController.handlePacket(message);
  }

  public handleCarDisconnect() {
    // Broadcast the car disconnect event to the frontend
    this.socketIO.broadcastCarDisconnect({ message: "Car has disconnected" });
    logger.info("Car disconnect event broadcasted to frontend");
  }
  public handleCarConnect() {
    // Broadcast the car disconnect event to the frontend
    this.socketIO.broadcastCarConnect({ message: "Car has connected" });
    logger.info("Car connect event broadcasted to frontend");
  }

  public async cleanup() {
    try {
      await this.timescaleDB.close();
      logger.info("Database connection closed successfully");
    } catch (error) {
      logger.error("Error closing database connection:", error);
    }
  }
}
