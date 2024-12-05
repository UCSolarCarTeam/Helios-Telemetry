import { BackendController } from "../BackendController/BackendController";

import { type Request, type Response } from "express";

import { createApplicationLogger } from "@/utils/logger";

const lambdaEndpoint = process.env.GET_LAP_CORRELATION_MATRIX_URL;
export const getPacketCorrelationMatrix = async (
  request: Request,
  response: Response,
) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "getPacketCorrelationMatrix.controller.ts",
    request,
    response,
  );

  logger.info(`ENTRY - ${request.method} ${request.url}`);
  const r = await fetch(process.env.GET_LAP_CORRELATION_MATRIX_URL);
  const data = await r.json();
  logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

  return response.status(200).json(data);
};
