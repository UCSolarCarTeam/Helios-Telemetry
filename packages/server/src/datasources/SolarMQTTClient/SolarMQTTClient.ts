import { type MqttClient, connect } from "mqtt";

import { type BackendController } from "@/controllers/BackendController/BackendController";

import {
  type MQTTOptions,
  type SolarMQTTClientType,
  topics,
} from "@/datasources/SolarMQTTClient/SolarMQTTClient.types";

import { type ITelemetryData } from "@/interfaces/telemetry-data.interface";

import { createLightweightApplicationLogger } from "@/utils/logger";

const { packetTopic, pingTopic } = topics;
const logger = createLightweightApplicationLogger("SolarMQTTClient.ts");

export class SolarMQTTClient implements SolarMQTTClientType {
  client: MqttClient;
  backendController: BackendController;
  constructor(options: MQTTOptions, backendController: BackendController) {
    this.client = connect(options.url);
    this.backendController = backendController;
    this.initializeListeners(this.client);
  }
  public pingTimer(miliseconds: number) {
    const myMessage = "Connection established";
    setInterval(() => {
      this.client.publish(pingTopic, myMessage);
    }, miliseconds);
  }
  public getLatencyCarToServer(packet: ITelemetryData) {
    const currentTime = Date.now();
    return currentTime - packet.TimeStamp;
  }
  public initializeListeners(client: MqttClient) {
    client.on("connect", () => {
      client.subscribe(packetTopic, (error) => {
        if (!error) {
          //
        } else {
          console.error("Subscription error: ", error);
        }
      });
      this.pingTimer(5000);
    });
    client.on("message", (topic, message) => {
      if (topic === pingTopic) {
        logger.info("Current Ping: ", message.toString());
      } else if (topic === packetTopic) {
        logger.info("Packet Received");
        const packet: ITelemetryData = JSON.parse(message.toString());
        // handle packet...
        this.backendController.socketIO.broadcastCarLatency(
          this.getLatencyCarToServer(packet),
        );
        this.backendController.handlePacketReceive(packet);
      } else {
        logger.info("unknown topic: ", topic, "message: ", message.toString());
      }
    });
  }
}
