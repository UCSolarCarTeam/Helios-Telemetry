import { IClientOptions, type MqttClient, connect } from "mqtt";

import { type BackendController } from "@/controllers/BackendController/BackendController";

import {
  type SolarMQTTClientType,
  topics,
} from "@/datasources/SolarMQTTClient/SolarMQTTClient.types";

import { getSecrets } from "@/utils/getSecrets";
import { createLightweightApplicationLogger } from "@/utils/logger";

import { type ITelemetryData } from "@shared/helios-types";

const { packetTopic, pingTopic, pongTopic } = topics;
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
  public pingTimer(miliseconds: number) {
    const myMessage = "t";
    setInterval(() => {
      this.pingLastSent = Date.now();
      this.client.publish(pingTopic, myMessage);
    }, miliseconds);
  }

  public async connectToAedes(options: IClientOptions) {
    try {
      this.client = connect(options);
      console.log("Connecting to MQTT", options);
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
      this.pingTimer(5000);
    });
    this.client.on("message", (topic, message) => {
      if (topic === pongTopic) {
        const carLatency = (Date.now() - this.pingLastSent) / 2;
        this.backendController.socketIO.broadcastCarLatency(carLatency);
      } else if (topic === packetTopic) {
        logger.info("Packet Received");
        const packet: ITelemetryData = JSON.parse(message.toString());
        this.backendController.handlePacketReceive(packet);
      } else {
        logger.info("unknown topic: ", topic, "message: ", message.toString());
      }
    });
    this.client.on("error", (error) => {
      logger.error("MQTT Client error: ", error);
    });
  }
}
