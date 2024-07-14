import dotenv from "dotenv";

dotenv.config();

// any constants go here
export const environment = {
  logDir: process.env.LOG_DIR || "logs",
  logFile: process.env.LOG_FILE || "app.log",
  logLevel: process.env.LOG_LEVEL || "info",
  nodeEnv: process.env.ENV || process.env.NODE_ENV,
};
