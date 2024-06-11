import { connect } from "mqtt";
import type { MqttClient } from "mqtt";

import { createLightweightApplicationLogger } from "@/utils/logger";

type Options = {
  url: string;
  clientId: string;
  username: string;
  password: string;
  clean: boolean;
};

const clientId = "server";
const subscribeTopic = "carToServer";
const publishTopic = "carToServer";

const logger = createLightweightApplicationLogger("serverMqttClient.ts");

const options: Options = {
  url: `mqtt://localhost:${process.env.MQTT_PORT || 1883}`,
  clientId,
  username: "urMom",
  password: "hasAedes",
  clean: true,
};

const client: MqttClient = connect(options);

client.on("connect", () => {
  logger.info(`${clientId} connected to MQTT broker`);
  client.subscribe(subscribeTopic, (error) => {
    if (!error) {
      logger.info(`${clientId} subscribed to ${subscribeTopic}`);
    } else {
      console.error(`${clientId} subscription error:`, error);
    }
  });
});

client.on("message", (topic, message) => {
  logger.info(
    `${clientId} received message on ${topic}: ${message.toString()}`,
  );
});

client.on("error", (error) => {
  console.error(`${clientId} MQTT Client Error:`, error);
});

setTimeout(() => {
  client.publish(publishTopic, "hello");
}, 5000);
