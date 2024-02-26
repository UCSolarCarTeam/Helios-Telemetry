import { type Request, type Response } from "express";

import { createApplicationLogger } from "@/utils/logger";

export const getHealth = (request: Request, response: Response) => {
  const logger = createApplicationLogger(
    "health.controller.ts",
    request,
    response,
  );
  logger.info(`ENTRY - ${request.method} ${request.url}`);
  const data = {
    uptime: process.uptime() + " seconds",
    message: "OK",
    date: new Date(),
  };
  logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

  return response.status(200).json(data);
};
