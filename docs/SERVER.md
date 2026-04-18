_last updated March 29th, 2025_

# Server Folder Documentation

We use Express.js, MQTT, TimescaleDB, and Socket.io as our main tech on the backend.

Our `index.ts` file handles the 'initiation' of our backend. You can find that file [here](../packages/server/src/index.ts)

We also have our debugger/logger created here, and the main [controller](#controllers) defined here. More is explained below.

## WTF IS A SOCKET.IO???

If you're in Software Eng then you'll learn sockets in ENSF 462. If you're comp sci then gg

When I say "i sent data over a socket" it basically means I sent data over a connection from myself to another client or server

Sockets are basically used to keep a persistent connection open between a client and a server. Here are some defintions:

- **emit**: Sends an event from the server to a specific client or all clients. Example: `io.emit("eventName", data)`.

- **broadcast**: Sends an event to all connected clients except the sender. Example: `io.broadcast("eventName", data).`

- **listen**: Not a direct Socket.IO method, but conceptually means setting up an event listener to handle incoming events. Typically done using `on()`.

Socket.io handles reconnections and fallbacks meaning that it automatically reconnects if a connection drops. This functionality is super important, because without it if the connection dropped during race and never reconnected then we would be in trouble, and have to restart the server which isn't feasible.

## What is MQTT

The specific MQTT library that we use is Aedes MQTT. The file is found [here](../packages/server/src/aedes.ts)

![mqtt pic](https://i.imgur.com/Zs8WnP6.png)

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

An example of a typed client call to a backend route is below:

```typescript
import { BACKEND_ROUTES } from "@/constants/apiRoutes";
import { backendApi } from "@/lib/api";
import type { DriversResponseDTO } from "@shared/helios-types";

const fetchDriverNames = async () => {
  const response = await backendApi.get<DriversResponseDTO>(
    BACKEND_ROUTES.drivers.base,
  );

  return response.data.data;
};
```

We use the configured `backendApi` instance to send a GET request to the specific endpoint that we define in our route constants, namely:

```typescript
driverRouter.get("/drivers", controllers.getDrivers);
```

To eventually call this function, which is specified in the second parameter (`.getDrivers()`):

```typescript
import type { Request, Response } from "express";
import type { DriversResponseDTO } from "@shared/helios-types";

export const getDrivers = async (
  request: Request,
  response: Response<DriversResponseDTO>,
) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "driver.controller.ts",
    request,
    response,
  );

  try {
    const driverData = await backendController.timescaleDB.getDrivers();

    logger.info(`ENTRY - ${request.method} ${request.url}`);
    const data: DriversResponseDTO = {
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

Also, for any client ↔ server contract:

- define the request/response DTO in `packages/shared/src/dto/`
- export it through `packages/shared/src/dto/index.ts`
- import it from `@shared/helios-types` on both the client and server

Avoid duplicating transport interfaces in a client hook and then redefining the same response shape in a server controller.

_Remember to define an `app.use()` in the `index.ts` file._

On the client side, prefer `backendApi` plus `BACKEND_ROUTES` instead of manually concatenating `prodURL`.

### Controllers

Our controllers handle the main logic of our backend. They are classes that contain fields and methods that interact with our various services, and "control" data flow and requests.

#### Backend Controller

The Backend Controller serves as the central hub for managing backend services. It initializes and maintains instances of TimescaleDB, SocketIO, MQTT, and LapController, passing itself (this) to allow interaction between them.

```typescript
  constructor(
    httpsServer: Server<typeof IncomingMessage, typeof ServerResponse>,
  ) {
    this.timescaleDB = new TimescaleDB(this);
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
