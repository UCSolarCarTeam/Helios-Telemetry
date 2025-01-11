import { getSecrets } from "./utils/getSecrets";

import Aedes, { type AuthenticateError, type Client } from "aedes";
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

const aedes: Aedes = new Aedes();
// Authentication function
aedes.authenticate = async function (
  client: Client,
  username: string | undefined,
  password: Buffer | undefined,
  done: (error: AuthenticateError | null, success: boolean) => void,
) {
  const secret = await getSecrets("HeliosTelemetryMQTTCredentials");
  const validUsername = secret.username;
  const validPassword = secret.password;
  if (!username || !password) {
    const error = new MqttError("Auth error", 4); // Use MqttError with returnCode
    done(error, false); // Authentication failed
    return;
  }
  if (username === validUsername && password.toString() === validPassword) {
    done(null, true); // Authentication successful
    logger.info(`Solar MQTT Client ${client.id} successfully authenticated!`);
  } else {
    const error = new MqttError("Auth error", 4); // Use MqttError with returnCode
    done(error, false); // Authentication failed
  }
};

export const startAedes = () => {
  return createServer(aedes.handle)
    .listen(port, async () => {
      logger.info(`Aedes server started and listening on port ${port}`);
      getSecrets("HeliosTelemetryMQTTCredentials");
    })
    .on("error", (error: Error) => {
      logger.error(error.message);
      throw error;
    });
};
