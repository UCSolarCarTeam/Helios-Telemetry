import type { BackendControllerTypes } from "@/controllers/BackendController/BackendController.types";
import { LapController } from "@/controllers/LapController";
import { SolarMQTTClient } from "@/datasources/SolarMQQTClient/SolarMQTTClient";
import { options } from "@/datasources/SolarMQQTClient/SolarMQTTClient.types";
import { logger } from "@/index";
import { SQLite } from "@/interfaces/SQLite";
import { SocketIO } from "@/interfaces/SocketIO";
import { type ITelemetryData } from "@/objects/telemetry-data.interface";

export class BackendController implements BackendControllerTypes {
  public sqLite: SQLite;
  public socketIO: SocketIO;
  public lapController: LapController;
  public mqtt: SolarMQTTClient;

  constructor() {
    this.sqLite = new SQLite("./database.sql");
    this.socketIO = new SocketIO();
    this.mqtt = new SolarMQTTClient(options);
    this.lapController = new LapController(this.socketIO, this.sqLite);
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

  public async handlePacketReceive(message: Buffer) {
    let parsedMessage: ITelemetryData;
    parsedMessage = JSON.parse(message.toString()) as ITelemetryData;
    // Insert the packet into the database
    await this.sqLite.insertPacketData(parsedMessage);

    // Broadcast the packet to the frontend
    this.socketIO.broadcastPacket(parsedMessage);

    // Handle the packet in the lap controller
    await this.lapController.handlePacket(parsedMessage);
  }
}
