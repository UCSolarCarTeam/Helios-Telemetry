const mqtt = require("mqtt");

// Helper function to create a client and setup listeners
function createClient(clientId) {
  const client = mqtt.connect(
    `mqtt://localhost:${process.env.MQTT_PORT || 1883}`,
    {
      clientId: clientId,
    },
  );

  client.on("connect", () => {
    console.log(`${clientId} connected to MQTT broker`);
    // Subscribe to a common topic
    client.subscribe("chat/topic", (err) => {
      if (!err) {
        console.log(`${clientId} subscribed to chat/topic`);
      } else {
        console.error(`${clientId} subscription error:`, err);
      }
    });
  });

  client.on("message", (topic, message) => {
    console.log(
      `${clientId} received message on ${topic}: ${message.toString()}`,
    );
  });

  client.on("error", (error) => {
    console.error(`${clientId} MQTT Client Error:`, error);
  });

  return client;
}

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
  client3.publish(
    "chat/topic",
    "Hello Client1, this is Client3 responding as well!",
  );
}, 2000);

// Note: In a real application, you might want to keep the clients running
// and not close them right away.
// Use client.end() to disconnect a client if needed.
