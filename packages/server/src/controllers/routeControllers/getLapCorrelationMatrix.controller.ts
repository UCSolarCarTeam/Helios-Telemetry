import { BackendController } from "../BackendController/BackendController";

import { type Request, type Response } from "express";

import { createApplicationLogger } from "@/utils/logger";

export const getLapCorrelationMatrix = (
  request: Request,
  response: Response,
) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "getLapCorrelationMatrix.controller.ts",
    request,
    response,
  );
  logger.info(`ENTRY - ${request.method} ${request.url}`);
  const data = {
    date: new Date(),
    message: "OK",
    uptime: process.uptime() + " seconds",
  };
  logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

  return response.status(200).json(data);
};
