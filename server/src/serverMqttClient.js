const mqtt = require("mqtt");

const clientId = "server";
const subscribeTopic = "carToServer";
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
  client.subscribe(subscribeTopic, (error) => {
    if (!error) {
      console.log(`${clientId} subscribed to ${subscribeTopic}`);
    } else {
      console.error(`${clientId} subscription error:`, error);
    }
  });
});

client.on("message", (topic, message) => {
  console.log(`${clientId} received message on ${topic}: ${message}`);
});

client.on("error", (error) => {
  console.error(`${clientId} MQTT Client Error:`, error);
});
