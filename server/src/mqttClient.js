const mqtt = require("mqtt");

// Connect to the MQTT broker
const client = mqtt.connect(
  `mqtt://localhost:${process.env.MQTT_PORT || 1883}`,
);

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  // Subscribe to a topic
  client.subscribe("test/topic", (err) => {
    if (!err) {
      console.log("Subscribed to test/topic");

      // Publish a message to the topic
      client.publish("test/topic", "Hello MQTT");
    } else {
      console.error("Subscription error:", err);
    }
  });
});

// Receive messages
client.on("message", (topic, message) => {
  console.log(`Received message on ${topic}: ${message.toString()}`);

  // Close the client after receiving the message
  client.end();
});

client.on("error", (error) => {
  console.error("MQTT Client Error:", error);
});
