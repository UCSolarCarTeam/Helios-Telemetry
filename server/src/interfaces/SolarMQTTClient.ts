import { type MqttClient, connect } from "mqtt";

import { createLightweightApplicationLogger } from "@/utils/logger";

type Options = {
  url: string;
  clientId: string;
  username: string;
  password: string;
  clean: boolean;
};

const clientId = "server";

const logger = createLightweightApplicationLogger("serverMqttClient.ts");

const options: Options = {
  url: `mqtt://localhost:${process.env.MQTT_PORT || 1883}`,
  clientId,
  username: "urMom",
  password: "hasAedes",
  clean: true,
};

const testTopic = "test topic";
const testMessage = "test  message";

export class SolarMQTTClient {
  client: MqttClient;
  messageRecCb: (message: Buffer) => void;
  latencyRecCb: (latency: number) => void;

  constructor(
    messageRecCb: (message: Buffer) => void,
    latencyRecCb: (latency: number) => void,
  ) {
    this.client = connect(options);
    this.messageRecCb = messageRecCb;
    this.latencyRecCb = latencyRecCb;
    this.initializeListeners(this.client);
  }

  public calculatePing() {
    this.client.publish("ping", "");
  }
  private initializeListeners(client: MqttClient) {
    client.on("connect", () => {
      // connect to broker
      logger.info(`${clientId} connected to MQTT broker`);
      client.subscribe(testTopic, (error) => {
        if (!error) {
          logger.info(`${clientId} subscribed to ${testTopic}`);
          client.publish(testTopic, testMessage); // publish message
        } else {
          console.error(`${clientId} subscription error:`, error);
        }
      });
    });

    client.on("message", (topic: string, message: Buffer) => {
      if (topic !== "PONG") {
        this.messageRecCb(message);
      } else if (topic === "PONG") {
        const latency = Date.now() - parseInt(message.toString());
        this.latencyRecCb(latency);
      }
    });

    client.on("error", (error) => {
      logger.error(`${clientId} MQTT Client Error:`, error);
    });
  }
}
