import type { MqttClient } from "mqtt";
import type { IClientOptions } from "mqtt/*";

import { prodFlag } from "@shared/helios-types";

export const options: IClientOptions = {
  host: prodFlag,
  password: process.env.MQTT_PASSWORD,
  port: 1883,
  protocol: "tcp",
  protocolVersion: 3,
  username: process.env.MQTT_USERNAME,
};

export const topics = {
  packetTopic: "packet",
  pingTopic: "ping",
  pongTopic: "pong",
  telemetryToCarTopic: "telemetryToCar",
};

export interface SolarMQTTClientType {
  client: MqttClient;
  initializeListeners(client: MqttClient): void;
  pingTimer(miliseconds: number): void;
}
