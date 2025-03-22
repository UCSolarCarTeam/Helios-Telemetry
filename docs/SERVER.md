# Server Folder Documentation

### What is MQTT

[](https://imgur.com/a/QbcLIhO)

Above is a diagram of how MQTT works for our website with specific examples. Here are some definitions of what is in the diagram:

- **Topic**: A topic is basically like a radio frequency where you have to tune in to this specific topic or frequency to actually listen in on it, or even send data to it. The Telemetry team subscribes and publishes to topics.

- **Publishing**: Publishing data to a topic means sending data to that specific topic or frequency. For example, on the radio, everyone who is listening on that frequency is able to hear the radio host "publish" or speak.

- **Subscribing**: Subscribing to a topic means that you are ready to recieve or listen in on that topic that you are subscribed to. For example, the people that are tuned into the specific radio frequency can hear what the radio host is saying because they are "subscribed" to that topic/frequency.

- **MQTT Broker**: The middleman between the Clients. You can think of this as the radio station tower that handles the topics and relays the messages between the radio host and the listeners.

- **MQTT Client**: These are basically the end users that are going to be receiving (subscribed on) or sending (publishing) data. In this case, the two MQTT clients are the Telemetry team and the Viscomm team. In this case though, both the Telemetry team and the Viscomm team are radio hosts and listeners, since we send data to eachother.

One big use case that the Telemetry team uses is with how the Viscomm team sends us [**packets**](README.md#Packets)

### Controllers

#### Lap Controller
