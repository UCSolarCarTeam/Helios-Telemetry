import { type Request, type Response } from "express";

import { createApplicationLogger } from "@/utils/logger";

export const receiveCoords = (request: Request, response: Response) => {
  const logger = createApplicationLogger(
    "setLapCoords.controller.ts",
    request,
    response,
  );
  logger.info(`ENTRY - ${request.method} ${request.url}`);

  // get the body of the request
  const body = request.body;
  logger.info(`Request body: ${JSON.stringify(body)}`);

  logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

  const data = {
    date: "Message Received",
    message: "OK",
    uptime: process.uptime() + " seconds",
  };
  return response.status(200).json(data);
};
