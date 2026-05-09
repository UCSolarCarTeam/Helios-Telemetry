import { BackendController } from "../BackendController/BackendController";

import { type Request, type Response } from "express";

import { createApplicationLogger } from "@/utils/logger";
import { TelemetryTransformer } from "@/utils/telemetryTransformer";

import {
  type AvailablePlaybackDatesResponseDTO,
  type AvailablePlaybackSegmentsResponseDTO,
  type PlaybackDataResponseDTO,
  type PlaybackDateRangeResponseDTO,
  type PlaybackHealthResponseDTO,
  type PlaybackPacketResponseDTO,
} from "@shared/helios-types";

const HOUR_IN_MS = 60 * 60 * 1000;

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

export const getAvailableDates = async (
  request: Request,
  response: Response<AvailablePlaybackDatesResponseDTO>,
) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "playback.controller.ts",
    request,
    response,
  );
  const availableDates =
    await backendController.databaseService.getAvailablePlaybackDates();

  logger.info(`ENTRY - ${request.method} ${request.url}`);
  const data: AvailablePlaybackDatesResponseDTO = {
    data: availableDates,
    message: "OK",
  };
  logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

  return response.status(200).json(data);
};

export const getAvailableSegments = async (
  request: Request,
  response: Response<AvailablePlaybackSegmentsResponseDTO>,
) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "playback.controller.ts",
    request,
    response,
  );

  const dayStartUtc = Number(request.query.dayStartUtc);
  const segmentMs = Number(request.query.segmentMs) || HOUR_IN_MS;

  if (!Number.isFinite(dayStartUtc) || dayStartUtc <= 0) {
    return response.status(400).json({
      data: [],
      message: "Invalid dayStartUtc query parameter",
    });
  }

  if (!Number.isFinite(segmentMs) || segmentMs <= 0) {
    return response.status(400).json({
      data: [],
      message: "Invalid segmentMs query parameter",
    });
  }

  const dayEndUtc = dayStartUtc + 24 * HOUR_IN_MS;
  const packets =
    await backendController.databaseService.scanPacketDataBetweenDates(
      dayStartUtc,
      dayEndUtc,
    );

  const segmentStarts = new Set<number>();

  for (const packet of packets) {
    const packetUtc = packet.timestamp.getTime();
    const relativeMs = packetUtc - dayStartUtc;

    if (relativeMs < 0 || relativeMs >= 24 * HOUR_IN_MS) {
      continue;
    }

    const segmentStartUtc =
      dayStartUtc + Math.floor(relativeMs / segmentMs) * segmentMs;
    segmentStarts.add(segmentStartUtc);
  }

  const segments = Array.from(segmentStarts)
    .sort((a, b) => a - b)
    .map((startUtc) => ({
      endUtc: startUtc + segmentMs,
      startUtc,
    }));

  logger.info(`ENTRY - ${request.method} ${request.url}`);
  const data: AvailablePlaybackSegmentsResponseDTO = {
    data: segments,
    message: "OK",
  };
  logger.info(`EXIT - ${request.method} ${request.url} - ${200}`);

  return response.status(200).json(data);
};
