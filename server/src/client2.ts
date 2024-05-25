import createClient from "./mqttClient";

// Creating multiple clients

const message = JSON.stringify({
  clientId: "Client2",
  content: "Hello Client1, this is Client2",
});

const clientOptions = {
  clientId: "Client2",
  publishTopic: "announcement/Client1",
  subscribeTopic: "announcement/Client2",
};

const client2 = createClient(
  clientOptions.clientId,
  clientOptions.subscribeTopic,
);

// Simulate responses from other clients
setTimeout(() => {
  client2.publish(clientOptions.publishTopic, message);
}, 5000);
