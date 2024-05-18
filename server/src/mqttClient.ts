import * as mqtt from "mqtt";
import { MqttClient } from "mqtt";

// Helper function to create a client and setup listeners
function createClient(clientId: string): MqttClient {
  const client: MqttClient = mqtt.connect(
    `mqtt://localhost:${process.env.MQTT_PORT || 1883}`,
    {
      clientId: clientId,
    },
  );

  client.on("connect", () => {
    console.log(`${clientId} connected to MQTT broker`);
    client.subscribe("chat/topic", (err: Error | null) => {
      if (!err) {
        console.log(`${clientId} subscribed to chat/topic`);
      } else {
        console.error(`${clientId} subscription error:`, err);
      }
    });
  });

  client.on("message", (topic: string, message: Buffer) => {
    console.log(
      `${clientId} received message on ${topic}: ${message.toString()}`,
    );
  });

  client.on("error", (error: Error) => {
    console.error(`${clientId} MQTT Client Error:`, error);
  });

  return client;
}

export default createClient;
