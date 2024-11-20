import type { MqttClient } from "mqtt";
import type { IClientOptions } from "mqtt/*";

export const options: IClientOptions = {
  host: "aedes.calgarysolarcar.ca",
  password: "hasAedes",
  port: 1883,
  protocol: "tcp",
  protocolVersion: 3,
  username: "urMom",
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
