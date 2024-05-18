const createClient = require("./mqttClient");

// Creating multiple clients
const client1 = createClient("Client1");
const client2 = createClient("Client2");
const client3 = createClient("Client3");

// Simulate publishing by one client
setTimeout(() => {
  client1.publish("chat/topic", "Hello from Client1");
}, 1000);

// Simulate responses from other clients
setTimeout(() => {
  client2.publish("chat/topic", "Hello Client1, this is Client2");
}, 1500);

setTimeout(() => {
  client3.publish("chat/topic", "Hello Client1, this is Client3 responding as well!");
}, 2000);
