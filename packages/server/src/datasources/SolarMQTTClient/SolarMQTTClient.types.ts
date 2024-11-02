import type { MqttClient } from "mqtt";
import type { IClientOptions } from "mqtt/*";

export const options: IClientOptions = {
  host: "aedes.calgarysolarcar.ca",
  port: 1883,
  protocolVersion: 3,
  username: "urMom",
  password: "hasAedes",
  protocol: "tcp",
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
