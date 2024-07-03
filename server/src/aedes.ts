// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Aedes, { AuthenticateError, Client } from "aedes";
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
  client: Client,
  username: string | undefined,
  password: Buffer | undefined,
  done: (error: AuthenticateError | null, success: boolean) => void,
) {
  // TO DO: Convert to ENV VARS
  const validUsername = "urMom"; // Replace with your valid username
  const validPassword = "hasAedes"; // Replace with your valid password
  if (!username || !password) {
    const error = new MqttError("Auth error", 4); // Use MqttError with returnCode
    done(error, false); // Authentication failed
    return;
  }
  if (username === validUsername && password.toString() === validPassword) {
    done(null, true); // Authentication successful
  } else {
    const error = new MqttError("Auth error", 4); // Use MqttError with returnCode
    done(error, false); // Authentication failed
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
