const mqtt = require("mqtt");

const clientId = "car";
const publishTopic = "carToServer";
const options = {
  url: `mqtt://localhost:${process.env.MQTT_PORT || 1883}`,
  clientId,
  username: "urMom",
  password: "hasAedes",
  clean: true,
};

const client = mqtt.connect(options);

client.on("connect", () => {
  console.log(`${clientId} connected to MQTT broker`);
});

client.on("error", (error) => {
  console.error(`${clientId} MQTT Client Error:`, error);
});

// Simulate message from car
setTimeout(() => {
  client.publish(publishTopic, "hello");
}, 5000);
