import { createLightweightApplicationLogger } from "@/utils/logger";

import { startAedes } from "@/aedes";
import { server, setBackendController, getBackendController } from "@/index";
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

// Graceful shutdown handling
process.on('SIGTERM', async () => {
  logger.info('Received SIGTERM, shutting down gracefully');
  await gracefulShutdown();
});

process.on('SIGINT', async () => {
  logger.info('Received SIGINT, shutting down gracefully');
  await gracefulShutdown();
});

async function gracefulShutdown() {
  try {
    const backendController = getBackendController();
    if (backendController) {
      await backendController.cleanup();
    }
    
    httpServer.close(() => {
      logger.info('Server closed successfully');
      process.exit(0);
    });
  } catch (error) {
    logger.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
}
