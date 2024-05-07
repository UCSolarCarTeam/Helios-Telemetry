import { Server, type Socket } from "socket.io";

import { createLightweightApplicationLogger } from "@/utils/logger";

const logger = createLightweightApplicationLogger("socket.controller.ts");

export const handleSocketConnection = (socket: Socket) => {
  logger.info("Client connected");

  const timerId = setInterval(() => {
    const now = new Date(); // Get the current time
    socket.emit("time", now.toString()); // Emit the current time to the client
    logger.info(`Time sent to client: ${now.toString()}`);
  }, 5000); // Set the interval to 5000 milliseconds (5 seconds)

  socket.on("test", () => {
    logger.info("Test event received");
  });

  socket.on("disconnect", () => {
    logger.info("Client disconnected");
    clearInterval(timerId);
  });

  socket.on("chat message", (msg) => {
    socket.emit("chat message", msg);
  });

  socket.on("create-something", (value) => {
    logger.info(`create-something event received with value: ${value}`);
    socket.emit("foo", `Received value: ${value}`);
  });
};
