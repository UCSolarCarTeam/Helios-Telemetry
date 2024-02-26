import axios from "axios";
import axiosRetry from "axios-retry";
import dotenv from "dotenv";
import express from "express";
import http from "http";

import router from "@/routes/health.route";
import {
  createLightweightApplicationLogger,
  shutdownLoggers,
} from "@/utils/logger";
import { type TerminusOptions, createTerminus } from "@godaddy/terminus";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

const logger = createLightweightApplicationLogger("index.ts");

axiosRetry(axios, {
  retries: 2,
  retryDelay: (retryCount) => {
    return retryCount * 1000; // time interval between retries
  },
  retryCondition(error) {
    return error.code === "ECONNABORTED";
  },

  onRetry: (retryCount) => {
    logger.warn(`Retrying axios call. Retry count: `, retryCount);
  },
});

// eslint-disable-next-line @typescript-eslint/require-await
const onSignal = async () => {
  logger.info("🚀 Server is starting cleanup");
  try {
    logger.info("Kafka Consumer Disconnected");
  } catch (err) {
    logger.error("Error disconnecting the kafka consumer", err as Error);
  }
};

// eslint-disable-next-line @typescript-eslint/require-await
const onShutdown = async () => {
  logger.info("Cleanup finished, 🚀 server is shutting down");
};

const gracefullyShutdown = (signal: string) => {
  logger.info(`${signal} signal received: closing HTTP server.`);
  server.close(() => {
    logger.info("Closing remaining resources, then closing HTTP server.");
    shutdownLoggers(); // Ensure any remaining async writes have finished.
  });
};

const terminusOption: TerminusOptions = {
  onSignal,
  onShutdown,
  timeout: 12 * 1000, // waits before closing the server
  signals: ["SIGINT", "SIGTERM", "SIGUSR2"],
};

export const server = createTerminus(http.createServer(app), terminusOption);

process.on("SIGQUIT", gracefullyShutdown);

export default app;
