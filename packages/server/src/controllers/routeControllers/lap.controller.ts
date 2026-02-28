import { BackendController } from "../BackendController/BackendController";

import { type NextFunction, type Request, type Response } from "express";

import { createApplicationLogger } from "@/utils/logger";

export const getLapData = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "lap.controller.ts",
    request,
    response,
  );
  try {
    const lapData = await backendController.timescaleDB.getLapData();

    logger.info(`ENTRY - ${request.method} ${request.url}`);
    const data = {
      data: lapData,
      message: "OK",
      uptime: process.uptime() + " seconds",
    };
    logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

    return response.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getHealthLapData = (request: Request, response: Response) => {
  const logger = createApplicationLogger(
    "driver.controller.ts",
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
