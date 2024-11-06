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
    const date = new Date(request.params.date);

    const packetData = await backendController.dynamoDB.getPacketData(date);

    logger.info(`ENTRY - ${request.method} ${request.url}`);
    const data = {
      data: packetData,
      message: "OK",
    };
    logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

    return response.status(200).json(data);
  } catch (error) {
    logger.error(`ERROR - ${request.method} ${request.url} - ${error.message}`);
    return response.status(500).json({ message: "Internal Server Error" });
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
    const { firstDate, lastDate } =
      await backendController.dynamoDB.getFirstAndLastPacketDates();

    logger.info(`ENTRY - ${request.method} ${request.url}`);
    const data = {
      firstDate: firstDate,
      lastDate: lastDate,
      message: "OK",
    };
    logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

    return response.status(200).json(data);
  } catch (error) {
    logger.error(`ERROR - ${request.method} ${request.url} - ${error.message}`);
    return response.status(500).json({ message: "Internal Server Error" });
  }
};
