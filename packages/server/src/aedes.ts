import Aedes, { type AuthenticateError, type Client } from "aedes";
import { createServer } from "net";

import { createLightweightApplicationLogger } from "@/utils/logger";

const logger = createLightweightApplicationLogger("aedes.ts");
const port = process.env.MQTT_SERVER_PORT || 1883;

const aedes: Aedes = new Aedes();

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
  if (!username || !password) {
    const error = new MqttError("Auth error", 4); // Use MqttError with returnCode
    done(error, false); // Authentication failed
    return;
  }
  if (
    username === process.env.MQTT_USER &&
    password.toString() === process.env.MQTT_PASS
  ) {
    done(null, true); // Authentication successful
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
