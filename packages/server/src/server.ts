import { createLightweightApplicationLogger } from "@/utils/logger";

import { startAedes } from "@/aedes";
import { server, setBackendController } from "@/index";
import main from "@/main";

const logger = createLightweightApplicationLogger("server.ts");
const port = process.env.SERVER_PORT || 3001;

export const httpServer = server
  .listen(port, () => {
    logger.info(`Server is listening on port ${port}`);

    logger.info(`Process ID: ${process.pid}`);
    logger.info(`Node Version: ${process.version}`);
    logger.info(`Server Port: ${port}`);
    logger.info(`Debug Port: ${process.debugPort}`);
    startAedes();
  })

  .on("error", (error: Error) => {
    logger.error(error.message);
    throw error;
  })
  .on("listening", () => {
    const backendController = main(httpServer);
    setBackendController(backendController);
  });
