import { type MqttClient, connect } from "mqtt";

import { type BackendController } from "@/controllers/BackendController/BackendController";

import {
  type MQTTOptions,
  type SolarMQTTClientType,
  topics,
} from "@/datasources/SolarMQTTClient/SolarMQTTClient.types";

import { type ITelemetryData } from "@/interfaces/telemetry-data.interface";

import { createLightweightApplicationLogger } from "@/utils/logger";

const { packetTopic, pingTopic, pongTopic } = topics;
const logger = createLightweightApplicationLogger("SolarMQTTClient.ts");

export class SolarMQTTClient implements SolarMQTTClientType {
  client: MqttClient;
  backendController: BackendController;
  pingLastSent: number;
  constructor(options: MQTTOptions, backendController: BackendController) {
    this.client = connect(options.url, {
      password: process.env.MQTT_PASS,
      username: process.env.MQTT_USER,
    });
    this.client.on("connect", () => {
      logger.info("Connected to MQTT Server");
    });
    this.client.on("error", (error) => {
      logger.error("MQTT Error: ", error);
    });

    this.backendController = backendController;
    this.initializeListeners();
  }
  public pingTimer(miliseconds: number) {
    const myMessage = "t";
    setInterval(() => {
      this.pingLastSent = Date.now();
      this.client.publish(pingTopic, myMessage);
    }, miliseconds);
  }

  public initializeListeners() {
    this.client.on("connect", () => {
      this.client.subscribe([packetTopic, pongTopic], (error) => {
        if (!error) {
          //
        } else {
          console.error("Subscription error: ", error);
        }
      });
      this.pingTimer(5000);
    });
    this.client.on("message", (topic, message) => {
      if (topic === pongTopic) {
        const carLatency = (Date.now() - this.pingLastSent) / 2;
        logger.info("Current Ping: ", carLatency);
        this.backendController.socketIO.broadcastCarLatency(carLatency);
      } else if (topic === packetTopic) {
        logger.info("Packet Received");
        const packet: ITelemetryData = JSON.parse(message.toString());
        this.backendController.handlePacketReceive(packet);
      } else {
        logger.info("unknown topic: ", topic, "message: ", message.toString());
      }
    });
  }
}
