import { MqttClient } from "mqtt";
import { IClientOptions } from "mqtt/*";

import { ITelemetryData } from "@/objects/telemetry-data.interface";

import { SolarMQTTClient } from "./SolarMQTTClient";

export type MQTTOptions = IClientOptions & { url: string };
export const options: MQTTOptions = {
  url: `mqtt://test.mosquitto.org:1883`,
};
export const topics = {
  packetTopic: "packet",
  pingTopic: "ping",
};

export interface SolarMQTTClientType {
  client: MqttClient;
  pingTimer(miliseconds: number): void;
  calculateLatency(pakcet: ITelemetryData): void;
  initializeListeners(client: MqttClient): void;
}
