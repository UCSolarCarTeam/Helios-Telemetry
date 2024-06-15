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

  constructor(messageRecCb: (message: Buffer) => void) {
    this.client = connect(options);
    this.messageRecCb = messageRecCb;

    this.client.on("connect", () => {
      // connect to broker
      logger.info(`${clientId} connected to MQTT broker`);
      this.client.subscribe(testTopic, (error) => {
        if (!error) {
          logger.info(`${clientId} subscribed to ${testTopic}`);
          this.client.publish(testTopic, testMessage); // publish message
        } else {
          console.error(`${clientId} subscription error:`, error);
        }
      });
    });
    this.client.on("message", (topic, message) => {
      if (topic === "PONG") {
        return;
      } else {
        this.messageRecCb(message);
      }
    });

    this.client.on("error", (error) => {
      logger.error(`${clientId} MQTT Client Error:`, error);
    });
  }

  public calculatePing() {
    this.client.publish("ping", "");
    const pingStart = Date.now();
    this.client.on("message", (topic, message) => {
      if (topic === "PONG") {
        return Date.now() - pingStart;
      }
    });
    return 0;
  }
}
