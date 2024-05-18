// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createLightweightApplicationLogger } from "@/utils/logger";

const logger = createLightweightApplicationLogger("aedes.ts");
const Aedes = require("aedes");
const { createServer } = require("net");

const aedes = new Aedes();
aedes.on("publish", async (packet, client) => {
  if (client) {
    logger.info(
      `Published message from client ${client.id}: ${packet.payload.toString()}`,
    );
  }
});

const server = createServer(aedes.handle);

export default server;
