import { BackendController } from "../BackendController/BackendController";

import { type Request, type Response } from "express";

import { createApplicationLogger } from "@/utils/logger";
import { validateDriverUpdatePassword } from "@/utils/validatePassword";

export const getDrivers = async (request: Request, response: Response) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "driver.controller.ts",
    request,
    response,
  );

  const driverData = await backendController.timescaleDB.getDrivers();

  logger.info(`ENTRY - ${request.method} ${request.url}`);
  const data = {
    data: driverData,
    message: "OK",
    uptime: process.uptime() + " seconds",
  };
  logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

  return response.status(200).json(data);
};

export const getDriverLaps = async (request: Request, response: Response) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "driver.controller.ts",
    request,
    response,
  );

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
) => {
  const { Rfid, name, password } = request.body;

  const logger = createApplicationLogger(
    "driver.controller.ts",
    request,
    response,
  );
  if (!name || !Rfid || !password) {
    logger.warn(
      `Missing required fields - Rfid: ${!!Rfid}, name: ${!!name}, password: ${!!password}`,
    );
    return response.status(400).json({
      error: "Name, Rfid, and password fields are required",
    });
  }

  // Validate password
  if (!validateDriverUpdatePassword(password)) {
    logger.warn(`Invalid password attempt for driver update - Rfid: ${Rfid}`);
    return response.status(401).json({
      error: "Invalid password",
    });
  }

  const backendController = request.app.locals
    .backendController as BackendController;

  const responseMessage = await backendController.timescaleDB.updateDriverInfo(
    Rfid,
    name,
  );

  logger.info(`ENTRY - ${request.method} ${request.url}`);
  const data = {
    message: responseMessage.message,
    uptime: process.uptime() + " seconds",
  };
  logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

  return response.status(200).json(data);
};
