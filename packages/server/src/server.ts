import aedesServer from "@/aedes";
import server from "@/index";
import { createLightweightApplicationLogger } from "@/utils/logger";

const logger = createLightweightApplicationLogger("server.ts");
const port = process.env.SERVER_PORT || 3001;
const aedesServerPort = process.env.MQTT_SERVER_PORT || 1883;

export const httpServer = server
  .listen(port, () => {
    logger.info(`Server is listening on port ${port}`);

    logger.info(`Process ID: ${process.pid}`);
    logger.info(`Node Version: ${process.version}`);
    logger.info(`Server Port: ${port}`);
    logger.info(`Debug Port: ${process.debugPort}`);
  })
  .on("error", (error: Error) => {
    logger.error(error.message);
    throw error;
  });

aedesServer.listen(aedesServerPort, () => {
  logger.info(`Aedes server started and listening on port ${aedesServerPort}`);
});
