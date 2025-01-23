import type { MqttClient } from "mqtt";
import type { IClientOptions } from "mqtt/*";

export const options: IClientOptions = {
  host:
    process.env.NODE_ENV === "development"
      ? "aedes.calgarysolarcar.ca"
      : "aedes.calgarysolarcar.ca",
  port: 1883,
  protocol: "tcp",
  protocolVersion: 3,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
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
