import type { MqttClient } from "mqtt";
import * as mqtt from "mqtt";

// Helper function to create a client and setup listeners
function createClient(clientId: string, subscribeTopic: string): MqttClient {
  const options = {
    url: `mqtt://localhost:${process.env.MQTT_PORT || 1883}`,
    clientId,
    username: "expectedUsername",
    password: "expectedPassword",
    clean: true,
  };

  const client = mqtt.connect(options);

  client.on("connect", () => {
    console.log(`${clientId} connected to MQTT broker`);
    client.subscribe(subscribeTopic, (err: Error | null) => {
      if (!err) {
        console.log(`${clientId} subscribed to ${subscribeTopic}`);
      } else {
        console.error(`${clientId} subscription error:`, err);
      }
    });
  });

  client.on("message", (topic: string, message: Buffer) => {
    const messageData = JSON.parse(message.toString());
    console.log(
      `${clientId} received message on ${topic}: ${messageData.content}`,
    );
  });

  client.on("error", (error: Error) => {
    console.error(`${clientId} MQTT Client Error:`, error);
  });
  return client;
}

export default createClient;
