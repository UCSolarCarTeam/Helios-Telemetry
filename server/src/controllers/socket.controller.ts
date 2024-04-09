import { type Socket } from "socket.io";

import { createLightweightApplicationLogger } from "@/utils/logger";

const logger = createLightweightApplicationLogger("socket.controller.ts");

export const handleSocketConnection = (socket: Socket) => {
  logger.info("Client connected");

  socket.on("test", () => {
    logger.info("Test event received");
  });

  socket.on("disconnect", () => {
    logger.info("Client disconnected");
  });
};
