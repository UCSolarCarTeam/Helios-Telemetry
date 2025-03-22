import { BackendController } from "../BackendController/BackendController";

import { type Request, type Response } from "express";

import { createApplicationLogger } from "@/utils/logger";

export const getPlaybackData = async (request: Request, response: Response) => {
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
      await backendController.dynamoDB.getPacketData(timestamp);

    logger.info(`ENTRY - ${request.method} ${request.url}`);
    const data = {
      data: packetData,
      message: "OK",
    };
    logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

    return response.status(200).json(data);
  } catch (error) {
    logger.error(`ERROR - ${request.method} ${request.url} - ${error.message}`);
    response.status(500).json({ message: `Server Error: ${error}` });
  }
};

export const getFirstAndLastPacket = async (
  request: Request,
  response: Response,
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
      await backendController.dynamoDB.getFirstAndLastPacketDates();

    logger.info(`ENTRY - ${request.method} ${request.url}`);
    const data = {
      firstDate: firstDateUTC,
      lastDate: lastDateUTC,
      message: "OK",
    };
    logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

    return response.status(200).json(data);
  } catch (error) {
    logger.error(`ERROR - ${request.method} ${request.url} - ${error.message}`);
    response.status(500).json({ message: `Server Error: ${error}` });
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
