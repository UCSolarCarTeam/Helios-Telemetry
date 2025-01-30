import { BackendController } from "../BackendController/BackendController";

import { type Request, type Response } from "express";

import { createApplicationLogger } from "@/utils/logger";

export const getDrivers = async (request: Request, response: Response) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "driver.controller.ts",
    request,
    response,
  );

  try {
    const driverData = await backendController.dynamoDB.getDrivers();

    logger.info(`ENTRY - ${request.method} ${request.url}`);
    const data = {
      data: driverData,
      message: "OK",
      uptime: process.uptime() + " seconds",
    };
    logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

    return response.status(200).json(data);
  } catch (err) {
    logger.error(`ERROR - ${request.method} ${request.url} - ${err.message}`);
    response.status(500).json({ message: "Server Error" });
  }
};

export const getDriverLaps = async (request: Request, response: Response) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "driver.controller.ts",
    request,
    response,
  );

  try {
    const rfid = request.params.rfid;
    const driverLaps = await backendController.dynamoDB.getDriverLaps(rfid);

    logger.info(`ENTRY - ${request.method} ${request.url}`);
    const data = {
      data: driverLaps,
      message: "OK",
      uptime: process.uptime() + " seconds",
    };
    logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

    return response.status(200).json(data);
  } catch (err) {
    logger.error(`ERROR - ${request.method} ${request.url} - ${err.message}`);
    response.status(500).json({ message: "Server Error" });
  }
};

export const getDriverHealth = (request: Request, response: Response) => {
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
