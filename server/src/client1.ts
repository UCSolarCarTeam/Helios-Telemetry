import createClient from "./mqttClient";

// Creating multiple clients
const message = JSON.stringify({
  clientId: "Client1",
  content: "Hello from Client1",
});

const clientOptions = {
  clientId: "Client1",
  publishTopic: "announcement/Client2",
  subscribeTopic: "announcement/Client1",
};

const client1 = createClient(
  clientOptions.clientId,
  clientOptions.subscribeTopic,
);

// Simulate responses from other clients
setTimeout(() => {
  client1.publish(clientOptions.publishTopic, message);
}, 5000);
