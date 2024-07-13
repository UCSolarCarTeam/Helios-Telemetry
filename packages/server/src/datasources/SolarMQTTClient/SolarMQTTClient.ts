import { type MqttClient, connect } from "mqtt";

import { ITelemetryData } from "@/objects/telemetry-data.interface";

import {
  MQTTOptions,
  SolarMQTTClientType,
  topics,
} from "./SolarMQTTClient.types";

const { packetTopic, pingTopic } = topics;
export class SolarMQTTClient implements SolarMQTTClientType {
  client: MqttClient;
  constructor(options: MQTTOptions) {
    this.client = connect(options.url);
    this.initializeListeners(this.client);
  }
  public pingTimer(miliseconds: number) {
    const myMessage = "Connection established";
    setInterval(() => {
      this.client.publish(pingTopic, myMessage);
    }, miliseconds);
  }
  public calculateLatency(packet: ITelemetryData) {
    const currentTime = Date.now();
    const vehicleToClientLatency = currentTime - packet.TimeStamp;
    console.log("Vehicle to Client Latency: ", vehicleToClientLatency, "ms");
  }
  public initializeListeners(client: MqttClient) {
    client.on("connect", () => {
      client.subscribe(packetTopic, (error) => {
        if (!error) {
        } else {
          console.error("Subscription error: ", error);
        }
      });
      this.pingTimer(5000);
    });
    client.on("message", (topic, message) => {
      if (topic === pingTopic) {
        console.log("Current Ping: ", message.toString());
      } else if (topic === packetTopic) {
        const packet: ITelemetryData = JSON.parse(message.toString());
        // handle packet...
        this.calculateLatency(packet);
      } else {
        console.log("unknown topic: ", topic, "message: ", message.toString());
      }
    });
  }
}