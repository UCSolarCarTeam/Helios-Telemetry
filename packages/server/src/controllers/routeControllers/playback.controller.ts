import { BackendController } from "../BackendController/BackendController";

import { type NextFunction, type Request, type Response } from "express";

import { createApplicationLogger } from "@/utils/logger";

export const getPacket = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "playback.controller.ts",
    request,
    response,
  );
  try {
    const timestamp = request.params.timestamp;

    const packetData =
      await backendController.timescaleDB.getPacketData(timestamp);

    logger.info(`ENTRY - ${request.method} ${request.url}`);
    const data = { data: packetData, message: "OK" };
    logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

    return response.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getPacketDataBetweenDates = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const backendController = request.app.locals
    .backendController as BackendController;
  const logger = createApplicationLogger(
    "playback.controller.ts",
    request,
    response,
  );

  try {
    // Extract query params safely
    const startTime = Number(request.query.startTime);

    const endTime = Number(request.query.endTime);

    // Fetch data from timescaleDB
    const packetData =
      await backendController.timescaleDB.scanPacketDataBetweenDates(
        startTime,
        endTime,
      );

    logger.info(`ENTRY - ${request.method} ${request.url}`);

    return response.status(200).json({ data: packetData, message: "OK" });
  } catch (error) {
    next(error);
  }
};

export const getFirstAndLastPacket = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "playback.controller.ts",
    request,
    response,
  );
  try {
    const { firstDateUTC, lastDateUTC } =
      await backendController.timescaleDB.getFirstAndLastPacketDates();

    logger.info(`ENTRY - ${request.method} ${request.url}`);
    const data = {
      firstDate: firstDateUTC,
      lastDate: lastDateUTC,
      message: "OK",
    };
    logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

    return response.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getHealthPlayback = (request: Request, response: Response) => {
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
