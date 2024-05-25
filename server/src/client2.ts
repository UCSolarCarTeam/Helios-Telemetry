import createClient from "./mqttClient";

// Creating multiple clients
const client2 = createClient("Client2");

const message = JSON.stringify({
  clientId: "Client2",
  content: "Hello Client1, this is Client2",
});

// Simulate responses from other clients
setTimeout(() => {
  client2.publish("chat/topic", message);
}, 5000);
