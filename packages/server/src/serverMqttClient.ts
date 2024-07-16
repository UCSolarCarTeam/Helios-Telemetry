import { connect } from "mqtt";
import type { MqttClient } from "mqtt";

import { createLightweightApplicationLogger } from "@/utils/logger";

type Options = {
  clean: boolean;
  clientId: string;
  password: string;
  url: string;
  username: string;
};

const clientId = "server";

const logger = createLightweightApplicationLogger("serverMqttClient.ts");

const options: Options = {
  clean: true,
  clientId,
  password: "hasAedes",
  url: `mqtt://localhost:${process.env.MQTT_SERVER_PORT || 1883}`,
  username: "urMom",
};

const testTopic = "test topic";
const testMessage = "test  message";

const client: MqttClient = connect(options);

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

client.on("message", (topic, message) => {
  logger.info(
    // see if message was recieved
    `${clientId} received message on ${topic}: ${message.toString()}`,
  );
});

client.on("error", (error) => {
  console.error(`${clientId} MQTT Client Error:`, error);
});
