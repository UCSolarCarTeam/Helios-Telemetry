import { IClientOptions, type MqttClient, connect } from "mqtt";

import { type BackendController } from "@/controllers/BackendController/BackendController";

import {
  type SolarMQTTClientType,
  topics,
} from "@/datasources/SolarMQTTClient/SolarMQTTClient.types";

import { createLightweightApplicationLogger } from "@/utils/logger";

import { ITelemetryData } from "@shared/helios-types";

const {
  carConnect,
  carDisconnect,
  packetTopic,
  pingTopic,
  pongTopic,
  telemetryToCarTopic,
} = topics;

type Topics = (typeof topics)[keyof typeof topics];

const logger = createLightweightApplicationLogger("SolarMQTTClient.ts");

export class SolarMQTTClient implements SolarMQTTClientType {
  client: MqttClient;
  backendController: BackendController;
  pingLastSent: number;
  latestRfid: string | null;
  constructor(options: IClientOptions, backendController: BackendController) {
    this.backendController = backendController;
    this.connectToAedes(options);
    this.pingLastSent = Date.now();
    this.latestRfid = null;
  }

  public pingTimer(milliseconds: number) {
    const myMessage = "t";
    setInterval(() => {
      this.pingLastSent = Date.now();
      this.client.publish(pingTopic, myMessage);
    }, milliseconds);
  }

  public telemetryToCar(milliseconds: number) {
    setInterval(async () => {
      const backendToCarLatency =
        this.backendController.carLatency?.toString() || "-1";
      try {
        const driverName = this.latestRfid
          ? await this.backendController.dynamoDB.getDriverNameUsingRfid(
              this.latestRfid,
            )
          : "Rfid not scanned";

        const infoToCar = {
          carLatency: backendToCarLatency,
          driverName: driverName,
        };

        this.client.publish(telemetryToCarTopic, JSON.stringify(infoToCar));
        logger.info("Car Latency - sending: ", backendToCarLatency);
      } catch (error) {
        logger.error("Error fetching driver name using Rfid: ", error.message);
      }
    }, milliseconds);
  }

  public async connectToAedes(options: IClientOptions) {
    try {
      this.client = connect(options);
      this.initializeListeners();
    } catch (error) {
      throw error;
    }
  }
  public initializeListeners() {
    this.client.on("connect", () => {
      logger.info("MQTT Client connected");
      this.client.subscribe(
        [packetTopic, pongTopic, carDisconnect, carConnect],
        (error) => {
          if (!error) {
            //
          } else {
            logger.error("Subscription error: ", error);
          }
        },
      );
    });

    this.client.on("message", (topic: Topics, message) => {
      logger.info("topic: ", topic);
      switch (topic) {
        case pongTopic:
          const serverToCarLatency = (Date.now() - this.pingLastSent) / 2; // one-way time
          this.backendController.carLatency = serverToCarLatency;
          logger.info(this.backendController.carLatency.toString());
          this.backendController.handleTelemetryToCar(serverToCarLatency);
          break;
        case packetTopic:
          const packet = JSON.parse(message.toString()) as ITelemetryData;
          try {
            this.backendController.handlePacketReceive(packet);
            this.latestRfid = packet.Pi.Rfid.toString();
          } catch (error) {
            logger.error(`Invalid packet format: ${error.message}`);
          }
          break;
        case carConnect:
          logger.info("car connected on mqtt client");
          this.backendController.handleCarConnect();
          break;
        case carDisconnect:
          logger.info("car disconnected on mqtt client");
          this.backendController.handleCarDisconnect();
          break;
        default:
          logger.info(
            "unknown topic: ",
            topic,
            "message: ",
            message.toString(),
          );
          break;
      }
    });

    this.client.on("error", (error) => {
      logger.error("MQTT Client error: ", error);
    });
  }
}
