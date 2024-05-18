import aedesServer from "@/aedes";
import expressServer from "@/index";
import { createLightweightApplicationLogger } from "@/utils/logger";

const logger = createLightweightApplicationLogger("server.ts");
const expressPort = process.env.SERVER_PORT;
const mqttPort = process.env.MQTT_PORT;

expressServer
  .listen(expressPort, () => {
    logger.info(`Express Server is listening on port ${expressPort}`);

    logger.info(`Process ID: ${process.pid}`);
    logger.info(`Node Version: ${process.version}`);
    logger.info(`Server Port: ${expressPort}`);
    logger.info(`Debug Port: ${process.debugPort}`);
  })
  .on("error", (error: Error) => {
    logger.error(error.message);
    throw error;
  });
aedesServer
  .listen(mqttPort, function () {
    logger.info(`Aedes Server is listening on port ${mqttPort}`);
  })
  .on("error", (error: Error) => {
    logger.error(error.message);
    throw error;
  });
