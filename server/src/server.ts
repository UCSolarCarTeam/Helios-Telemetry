import server, { io } from "@/index";
import { createLightweightApplicationLogger } from "@/utils/logger";

const logger = createLightweightApplicationLogger("server.ts");
const port = process.env.SERVER_PORT;

server
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
