import { LapController } from "@/controllers/LapController";
import { logger } from "@/index";
import { SQLite } from "@/interfaces/SQLite";
import { SocketIO } from "@/interfaces/SocketIO";
import { SolarMQTTClient } from "@/interfaces/SolarMQTTClient";

export class BackendController {
  private sqLite: SQLite;
  private socketIO: SocketIO;
  private lapController: LapController;
  private mqtt: SolarMQTTClient;

  constructor() {
    this.sqLite = new SQLite("./database.sql");
    this.socketIO = new SocketIO();
    this.mqtt = new SolarMQTTClient(
      (msg) => this.handlePacketReceive,
      (msg) => this.handleCarLatency,
    );
    this.lapController = new LapController(this.socketIO, this.sqlLite);
    this.establishCarPinging();
  }

  private establishCarPinging() {
    // Ping the car every 5 seconds
    setInterval(() => {
      const carLatency = this.mqtt.calculatePing();
    }, 5000);
  }

  private handleCarLatency(carLatency: number) {
    // Broadcast the car latency to the frontend
    this.socketIO.broadcastCarLatency(carLatency);
    logger.info("Car Latency: ", carLatency.toString());
  }

  private handlePacketReceive(message: Buffer) {
    // Insert the packet into the database
    this.sqlLite.insertPacket(message);

    // Broadcast the packet to the frontend
    this.socketIO.broadcastPacket(JSON.parse(message.toString()));

    // Handle the packet in the lap controller
    this.lapController.handlePacket(message);
  }
}
