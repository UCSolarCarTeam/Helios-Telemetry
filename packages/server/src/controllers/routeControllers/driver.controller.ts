import { BackendController } from "../BackendController/BackendController";

import { type Request, type Response } from "express";

import { createApplicationLogger } from "@/utils/logger";
import { validateDriverUpdatePassword } from "@/utils/validatePassword";

import {
  type DriverHealthResponseDTO,
  type DriversResponseDTO,
  type LapDataResponseDTO,
  type UpdateDriverInfoErrorResponseDTO,
  type UpdateDriverInfoRequestDTO,
  type UpdateDriverInfoResponseDTO,
} from "@shared/helios-types";

export const getDrivers = async (
  request: Request,
  response: Response<DriversResponseDTO>,
) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "driver.controller.ts",
    request,
    response,
  );

  const driverData = await backendController.timescaleDB.getDrivers();

  logger.info(`ENTRY - ${request.method} ${request.url}`);
  const data: DriversResponseDTO = {
    data: driverData,
    message: "OK",
    uptime: process.uptime() + " seconds",
  };
  logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

  return response.status(200).json(data);
};

export const getDriverLaps = async (
  request: Request,
  response: Response<LapDataResponseDTO>,
) => {
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
  const data: LapDataResponseDTO = {
    data: driverLaps,
    message: "OK",
    uptime: process.uptime() + " seconds",
  };
  logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

  return response.status(200).json(data);
};

export const getDriverHealth = (
  request: Request,
  response: Response<DriverHealthResponseDTO>,
) => {
  const logger = createApplicationLogger(
    "driver.controller.ts",
    request,
    response,
  );
  logger.info(`ENTRY - ${request.method} ${request.url}`);
  const data: DriverHealthResponseDTO = {
    date: new Date(),
    message: "OK",
    uptime: process.uptime() + " seconds",
  };
  logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

  return response.status(200).json(data);
};

export const updateDriverInfo = async (
  request: Request<Record<string, string>, unknown, UpdateDriverInfoRequestDTO>,
  response: Response<
    UpdateDriverInfoResponseDTO | UpdateDriverInfoErrorResponseDTO
  >,
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

  if (!responseMessage) {
    logger.warn(`Driver update failed - Rfid not found: ${Rfid}`);
    return response.status(404).json({
      error: "Driver Rfid not found in driver table",
    });
  }

  logger.info(`ENTRY - ${request.method} ${request.url}`);
  const data: UpdateDriverInfoResponseDTO = {
    message: responseMessage.message,
    uptime: process.uptime() + " seconds",
  };
  logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

  return response.status(200).json(data);
};
