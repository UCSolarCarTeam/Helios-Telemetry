import { BackendController } from "../BackendController/BackendController";

import { type NextFunction, type Request, type Response } from "express";

import { createApplicationLogger } from "@/utils/logger";

export const getDrivers = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "driver.controller.ts",
    request,
    response,
  );

  try {
    const driverData = await backendController.timescaleDB.getDrivers();

    logger.info(`ENTRY - ${request.method} ${request.url}`);
    const data = {
      data: driverData,
      message: "OK",
      uptime: process.uptime() + " seconds",
    };
    logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

    return response.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getDriverLaps = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "driver.controller.ts",
    request,
    response,
  );

  try {
    const Rfid = request.params.Rfid;
    const driverLaps = await backendController.timescaleDB.getDriverLaps(Rfid);

    logger.info(`ENTRY - ${request.method} ${request.url}`);
    const data = {
      data: driverLaps,
      message: "OK",
      uptime: process.uptime() + " seconds",
    };
    logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

    return response.status(200).json(data);
  } catch (err) {
    next(err);
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

export const updateDriverInfo = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { Rfid, name } = request.body;

  if (!name || !Rfid) {
    return response
      .status(400)
      .json({ error: "Name and Rfid fields are required" });
  }

  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "driver.controller.ts",
    request,
    response,
  );

  try {
    const responseMessage =
      await backendController.timescaleDB.updateDriverInfo(Rfid, name);

    logger.info(`ENTRY - ${request.method} ${request.url}`);
    const data = {
      message: responseMessage.message,
      uptime: process.uptime() + " seconds",
    };
    logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

    return response.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
