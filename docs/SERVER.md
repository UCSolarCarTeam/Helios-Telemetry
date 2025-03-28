# Server Folder Documentation

We use Express.js, MQTT, the DynamoSDK, and Socket.io as our main tech on the backend.

Our `index.ts` file handles the 'initiation' of our backend. You can find that file [here](../packages/server/src/index.ts)

We also have our debugger/logger created here, and the main [controller](#controllers) defined here. More is explained below.

## WTF IS A SOCKET.IO???

If you're in Software Eng then you'll learn sockets in ENSF 462. If you're comp sci then gg

Sockets are basically used to keep a persistent connection open between a client and a server. Here are some defintions:

- **emit**: Sends an event from the server to a specific client or all clients. Example: socket.emit("eventName", data).

- **broadcast**: Sends an event to all connected clients except the sender. Example: socket.broadcast.emit("eventName", data).

- **listen**: Not a direct Socket.IO method, but conceptually means setting up an event listener to handle incoming events. Typically done using on().

on – Listens for a specific event and executes a callback when the event occurs. Example: socket.on("eventName", (data) => { /_ handle event _/ }).

Supports broadcasting – Messages can be sent to specific clients, all clients, or groups (rooms).

Handles reconnections and fallbacks – Automatically reconnects if a connection drops.

## What is MQTT

The specific MQTT library that we use is Aedes MQTT. The file is found [here](../packages/server/src/aedes.ts)

[](https://imgur.com/a/QbcLIhO)

Above is a diagram of how MQTT works for our website with specific examples. Here are some definitions of what is in the diagram:

- **Topic**: A topic is basically like a radio frequency where you have to tune in to this specific topic or frequency to actually listen in on it, or even send data to it. The Telemetry team subscribes and publishes to topics.

- **Publishing**: Publishing data to a topic means sending data to that specific topic or frequency. For example, on the radio, everyone who is listening on that frequency is able to hear the radio host "publish" or speak.

- **Subscribing**: Subscribing to a topic means that you are ready to recieve or listen in on that topic that you are subscribed to. For example, the people that are tuned into the specific radio frequency can hear what the radio host is saying because they are "subscribed" to that topic/frequency.

- **MQTT Broker**: The middleman between the Clients. You can think of this as the radio station tower that handles the topics and relays the messages between the radio host and the listeners.

- **MQTT Client**: These are basically the end users that are going to be receiving (subscribed on) or sending (publishing) data. In this case, the two MQTT clients are the Telemetry team and the Viscomm team. In this case though, both the Telemetry team and the Viscomm team are radio hosts and listeners, since we send data to eachother.

When subscribing to a topic, we first have to authenticate ourselves with a username and password. This username and password is currently stored in [Secrets Manager](./AMPLIFY.md#what-aws-services-do-we-use). For local development, you'll have to put these as env variables.

One big use case that the Telemetry team uses is with how the Viscomm team sends us [**packets**](README.md#Packets)

## What do we use Express.js for??

If you did not know, express.js is how we set up our api routes for requesting data with Node.js. You can see that we have multiple [routes](./SERVER.md#what-is-a-route) that specify endpoints that call specific functions in the respective [controllers](./SERVER.md#controllers).

### What is a route??

We define our routes [here](../packages/server/src/routes/).

An example of when we call a route is below:

```typescript
  const fetchDriverNames = async () => {
    try {
      const response = await axios.get(`${prodURL}/drivers`);

      return response.data;
    } catch (error) {
      return { error: "Error fetching drivers" };
    }
  };
```

We use axios to send a GET request in this case to the specific endpoint that we define in our route, namely:

```typescript
driverRouter.get("/drivers", controllers.getDrivers);
```

To eventually call this function, which is specified in the second parameter (`.getDrivers()`):

```typescript
export const getDrivers = async (request: Request, response: Response) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "driver.controller.ts",
    request,
    response,
  );

  try {
    const driverData = await backendController.dynamoDB.getDrivers();

    logger.info(`ENTRY - ${request.method} ${request.url}`);
    const data = {
      data: driverData,
      message: "OK",
      uptime: process.uptime() + " seconds",
    };
    logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

    return response.status(200).json(data);
  } catch (err) {
    logger.error(`ERROR - ${request.method} ${request.url} - ${err.message}`);
    response.status(500).json({ message: `Server Error: ${err}` });
  }
};
```

Please note how we are returning and handling errors and successes. This is good practice, so if you define more routes keep doing this.

_Remember to define an `app.use()` in the `index.ts` file._

The prodURL variable is defined [here](../packages/shared/src/prodFlag.ts) as a way to differentiate between running our server locally and when it is actually deployed. There are reasons for this ask ideen lol something about safety and it's not common practice.

### Controllers

Our controllers handle the main logic of our backend. They are classes that contain fields and methods that interact with our various services, and "control" data flow and requests.

#### Backend Controller

The Backend Controller serves as the central hub for managing backend services. It initializes and maintains instances of DynamoDB, SocketIO, MQTT, and LapController, passing itself (this) to allow interaction between them.

```typescript
  constructor(
    httpsServer: Server<typeof IncomingMessage, typeof ServerResponse>,
  ) {
    this.dynamoDB = new DynamoDB(this);
    this.socketIO = new SocketIO(httpsServer, this);
    this.mqtt = new SolarMQTTClient(options, this);
    this.lapController = new LapController(this);
    this.establishCarPinging();
    this.carLatency = 0;
    // this.handleCarLatency();
  }
```

#### Lap Controller

The lap controller handles three main functionalities:

- Calculations for the fields that are in the [lap](TELEMETRY.md#lap) data
  - This is covered in all the functions that start with the `.calculate...`
- Inserting the lap into the database
  - This is handled by the `handlePacket` function where the lap is created based off all the packet data coming in
  - Insertion only occurs when a lap is completed
- Logic for calculating to see if the lap has been completed
  - This is handled by the 'checkLap()' member function\
  - The checklap function basically just checks to see whether the car is in the radius of the flag position

#### Dynamo DB Controller

Idk why this name doesn't actually have the name of controller but it does control the data flow and requests of what we are requesting or posting to dynamo.

Each function in here is pretty self explanatory as to what it does, and it fetches data for our three tables, as described [here](./AMPLIFY.md#our-tables)
