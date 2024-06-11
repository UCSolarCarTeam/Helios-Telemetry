// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Aedes from "aedes";
import { createServer } from "net";

import { createLightweightApplicationLogger } from "@/utils/logger";

const logger = createLightweightApplicationLogger("aedes.ts");

const aedes: Aedes = new Aedes();
const aedesServer = createServer(aedes.handle);

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
aedes.authenticate = function (
  username: string,
  password: string,
  callback: (error: Error | null, success: boolean) => void,
) {
  const validUsername = "urMom"; // Replace with your valid username
  const validPassword = "hasAedes"; // Replace with your valid password

  if (username === validUsername && password.toString() === validPassword) {
    callback(null, true); // Authentication successful
  } else {
    const error = new MqttError("Auth error", 4); // Use MqttError with returnCode
    callback(error, false); // Authentication failed
  }
};

aedes.on("publish", (packet, client) => {
  if (client) {
    logger.info(
      `Published message from client ${client.id}: ${packet.payload.toString()}`,
    );
  }
});

export default aedesServer;
