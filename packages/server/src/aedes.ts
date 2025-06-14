import Aedes, {
  type AuthenticateError,
  type Client,
  PublishPacket,
} from "aedes";
import { createServer } from "net";

import { createLightweightApplicationLogger } from "@/utils/logger";

const logger = createLightweightApplicationLogger("aedes.ts");
const port = process.env.MQTT_SERVER_PORT || 1883;

class MqttError extends Error {
  returnCode: number;

  constructor(message: string, returnCode: number) {
    logger.warn(message + ` - ${returnCode}`);
    super(message);
    this.returnCode = returnCode;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, MqttError.prototype);
  }
}
const notifyHeliosDisconnect: PublishPacket = {
  cmd: "publish",
  dup: false, // Not a duplicate
  payload: Buffer.from("Client has disconnected"), // Message content
  qos: 0, // No delivery guarantee
  retain: true, // Do retain the message
  topic: "carDisconnect",
};
const notifyHeliosConnect = {
  cmd: "publish",
  dup: false, // Not a duplicate
  payload: Buffer.from("Aedes has connected to the vehicle"), // Message content
  qos: 0, // No delivery guarantee
  retain: true, // Do retain the message
  topic: "carConnect",
} as const satisfies PublishPacket;

const aedes: Aedes = new Aedes();
aedes.on("clientDisconnect", () => {
  logger.info("client disconnected");
  aedes.publish(notifyHeliosDisconnect, () => {});
});
// Authentication function
aedes.authenticate = function (
  client: Client,
  username: string | undefined,
  password: Buffer | undefined,
  done: (error: AuthenticateError | null, success: boolean) => void,
) {
  const validUsername = process.env.MQTT_USERNAME;
  const validPassword = process.env.MQTT_PASSWORD;
  // Set Max connections to Aedes (Car Client and Solar MQTT client)
  if (aedes.connectedClients >= 3) {
    const error = new MqttError("Too many clients", 5);
    done(error, false);
    return;
  }

  if (!username || !password) {
    const error = new MqttError("Auth error", 4); // Use MqttError with returnCode
    done(error, false); // Authentication failed
    return;
  }

  // User authentication
  if (username === validUsername && password.toString() === validPassword) {
    done(null, true); // Authentication successful
    logger.info(`MQTT Client ${client.id} successfully authenticated!`);
    aedes.publish(notifyHeliosConnect, (err) =>
      logger.error(err?.message || "Failed to publish connect message"),
    );
  } else {
    const error = new MqttError("Auth error", 4); // Use MqttError with returnCode
    done(error, false); // Authentication failed
  }
};

export const startAedes = () => {
  return createServer(aedes.handle)
    .listen(port, () => {
      logger.info(`Aedes server started and listening on port ${port}`);
    })
    .on("error", (error: Error) => {
      logger.error(error.message);
      throw error;
    });
};
