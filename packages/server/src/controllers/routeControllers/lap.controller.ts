import { BackendController } from "../BackendController/BackendController";

import { type Request, type Response } from "express";

import { createApplicationLogger } from "@/utils/logger";

export const getLapData = async (request: Request, response: Response) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "lap.controller.ts",
    request,
    response,
  );
  try {
    const lapData = await backendController.dynamoDB.getLapData();

    logger.info(`ENTRY - ${request.method} ${request.url}`);
    const data = {
      data: lapData,
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
