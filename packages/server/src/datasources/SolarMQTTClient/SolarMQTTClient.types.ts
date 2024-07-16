import type { MqttClient } from "mqtt";
import type { IClientOptions } from "mqtt/*";

import type { ITelemetryData } from "@/interfaces/telemetry-data.interface";

export type MQTTOptions = IClientOptions & { url: string };
export const options: MQTTOptions = {
  url: `mqtt://test.mosquitto.org:1883`,
};
export const topics = {
  packetTopic: "packet",
  pingTopic: "ping",
  pongTopic: "pong",
};

export interface SolarMQTTClientType {
  client: MqttClient;
  initializeListeners(client: MqttClient): void;
  pingTimer(miliseconds: number): void;
}
