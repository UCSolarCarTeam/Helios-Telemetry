// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createLightweightApplicationLogger } from "@/utils/logger";

const logger = createLightweightApplicationLogger("aedes.ts");
const Aedes = require("aedes");
const { createServer } = require("net");

const aedes = new Aedes();
class MqttError extends Error {
  returnCode: number;

  constructor(message: string, returnCode: number) {
    super(message);
    this.returnCode = returnCode;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, MqttError.prototype);
  }
}
// Authentication function
aedes.authenticate = function (client, username, password, callback) {
  const validUsername = "expectedUsername"; // Replace with your valid username
  const validPassword = "expectedPassword"; // Replace with your valid password

  if (username === validUsername && password.toString() === validPassword) {
    callback(null, true); // Authentication successful
  } else {
    const error = new MqttError("Auth error", 4); // Use MqttError with returnCode
    callback(error, false); // Authentication failed
  }
};

aedes.on("publish", async (packet, client) => {
  if (client) {
    logger.info(
      `Published message from client ${client.id}: ${packet.payload.toString()}`,
    );
  }
});

const server = createServer(aedes.handle);

export default server;
