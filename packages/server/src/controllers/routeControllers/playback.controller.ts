import { BackendController } from "../BackendController/BackendController";

import { type Request, type Response } from "express";

import { createApplicationLogger } from "@/utils/logger";
import { TelemetryTransformer } from "@/utils/telemetryTransformer";

import {
  type PlaybackDataResponseDTO,
  type PlaybackDateRangeResponseDTO,
  type PlaybackHealthResponseDTO,
  type PlaybackPacketResponseDTO,
} from "@shared/helios-types";

export const getPacket = async (
  request: Request,
  response: Response<PlaybackPacketResponseDTO>,
) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "playback.controller.ts",
    request,
    response,
  );
  const timestamp = request.params.timestamp;

  const packetData =
    await backendController.databaseService.getPacketData(timestamp);

  logger.info(`ENTRY - ${request.method} ${request.url}`);
  const data: PlaybackPacketResponseDTO = {
    data: packetData ? TelemetryTransformer.inflate(packetData) : null,
    message: packetData ? "OK" : "Not found",
  };
  logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

  return response.status(200).json(data);
};
export const getPacketDataBetweenDates = async (
  request: Request,
  response: Response<PlaybackDataResponseDTO>,
) => {
  const backendController = request.app.locals
    .backendController as BackendController;
  const logger = createApplicationLogger(
    "playback.controller.ts",
    request,
    response,
  );

  // Extract query params safely
  const startTime = Number(request.query.startTime);

  const endTime = Number(request.query.endTime);

  // Fetch data from the database service
  const packetData =
    await backendController.databaseService.scanPacketDataBetweenDates(
      startTime,
      endTime,
    );

  logger.info(`ENTRY - ${request.method} ${request.url}`);

  const data: PlaybackDataResponseDTO = {
    data: packetData.map(TelemetryTransformer.inflate),
    message: "OK",
  };

  return response.status(200).json(data);
};

export const getFirstAndLastPacket = async (
  request: Request,
  response: Response<PlaybackDateRangeResponseDTO>,
) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "playback.controller.ts",
    request,
    response,
  );
  const { firstDateUTC, lastDateUTC } =
    await backendController.databaseService.getFirstAndLastPacketDates();

  logger.info(`ENTRY - ${request.method} ${request.url}`);
  const data: PlaybackDateRangeResponseDTO = {
    firstDate: firstDateUTC,
    lastDate: lastDateUTC,
    message: "OK",
  };
  logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

  return response.status(200).json(data);
};

export const getHealthPlayback = (
  request: Request,
  response: Response<PlaybackHealthResponseDTO>,
) => {
  const logger = createApplicationLogger(
    "playback.controller.ts",
    request,
    response,
  );
  logger.info(`ENTRY - ${request.method} ${request.url}`);
  const data: PlaybackHealthResponseDTO = {
    date: new Date(),
    message: "OK",
    uptime: process.uptime() + " seconds",
  };
  logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

  return response.status(200).json(data);
};
