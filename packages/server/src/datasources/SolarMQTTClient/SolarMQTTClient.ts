import { IClientOptions, type MqttClient, connect } from "mqtt";

import { type BackendController } from "@/controllers/BackendController/BackendController";

import {
  type SolarMQTTClientType,
  topics,
} from "@/datasources/SolarMQTTClient/SolarMQTTClient.types";

import { getSecrets } from "@/utils/getSecrets";
import { createLightweightApplicationLogger } from "@/utils/logger";

import { validateTelemetryData } from "@shared/helios-types";

const { packetTopic, pingTopic, pongTopic, telemetryToCarTopic } = topics;
const logger = createLightweightApplicationLogger("SolarMQTTClient.ts");

export class SolarMQTTClient implements SolarMQTTClientType {
  client: MqttClient;
  backendController: BackendController;
  pingLastSent: number;
  constructor(options: IClientOptions, backendController: BackendController) {
    this.backendController = backendController;
    this.connectToAedes(options);
    this.pingLastSent = Date.now();
  }

  public pingTimer(milliseconds: number) {
    const myMessage = "t";
    setInterval(() => {
      this.pingLastSent = Date.now();
      this.client.publish(pingTopic, myMessage);
    }, milliseconds);
  }

  public telemetryToCar(milliseconds: number, message: string) {
    setInterval(() => {
      this.client.publish(telemetryToCarTopic, message);
      logger.info("Car Latency - sending: ", message);
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
      this.client.subscribe([packetTopic, pongTopic], (error) => {
        if (!error) {
          //
        } else {
          logger.error("Subscription error: ", error);
        }
      });
    });

    this.client.on("message", (topic, message) => {
      if (topic === pongTopic) {
        logger.info("pong");
        const serverToCarLatency = (Date.now() - this.pingLastSent) / 2; // one-way time
        logger.info(serverToCarLatency.toString());
        this.backendController.carLatency = serverToCarLatency;
        this.backendController.handleTelemetryToCar(serverToCarLatency);
      } else if (topic === packetTopic) {
        logger.info("Packet Received");
        const packet = JSON.parse(message.toString());
        try {
          const validPacket = validateTelemetryData(packet);
          this.backendController.handlePacketReceive(validPacket);
        } catch (error) {
          logger.error(`Invalid packet format: ${error.message}`);
        }
      } else {
        logger.info("unknown topic: ", topic, "message: ", message.toString());
      }
    });

    this.client.on("error", (error) => {
      logger.error("MQTT Client error: ", error);
    });
  }
}
