import { BackendController } from "./controllers/BackendController/BackendController";

import axios from "axios";
import axiosRetry from "axios-retry";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import https from "https";
import "module-alias";

import healthRouter from "@/routes/health.route";

import {
  createLightweightApplicationLogger,
  shutdownLoggers,
} from "@/utils/logger";

import { getCredentials } from "@/credentials";
import { type TerminusOptions, createTerminus } from "@godaddy/terminus";

dotenv.config();

const app = express();
let backendController: BackendController | null;
export const setBackendController = (backend: BackendController) => {
  backendController = backend;
};
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  app.locals.backendController = backendController;
  next();
});

app.use("/", healthRouter);

export const logger = createLightweightApplicationLogger("index.ts");
axiosRetry(axios, {
  onRetry: (retryCount) => {
    logger.warn(`Retrying axios call. Retry count: `, retryCount);
  },
  retries: 2,
  retryCondition(error) {
    return error.code === "ECONNABORTED";
  },

  retryDelay: (retryCount) => {
    return retryCount * 1000; // time interval between retries
  },
});

const onSignal = async () => {
  logger.info("🚀 Server is starting cleanup");

  try {
    logger.info("Kafka Consumer Disconnected");
  } catch (err) {
    logger.error("Error disconnecting the kafka consumer", err as Error);
  }
};

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
  onShutdown,
  onSignal,
  signals: ["SIGINT", "SIGTERM", "SIGUSR2"],
  timeout: 12 * 1000, // waits before closing the server
};

export const server = createTerminus(
  process.env.NODE_ENV === "development"
    ? http.createServer(app)
    : https.createServer(getCredentials(), app),
  terminusOption,
);

process.on("SIGQUIT", gracefullyShutdown);
