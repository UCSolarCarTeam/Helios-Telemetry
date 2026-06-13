import type { BackendController } from "../BackendController/BackendController";

import { type Request, type Response } from "express";

import { createApplicationLogger } from "@/utils/logger";
import { validateSnapshotPassword } from "@/utils/validatePassword";

import type {
  CreateSnapshotRequestDTO,
  CreateSnapshotResponseDTO,
  IGrafanaSnapshot,
  IGrafanaSnapshotRow,
  RecentSnapshotResponseDTO,
} from "@shared/helios-types";

/**
 * Maps a Prisma grafana_snapshot row to its serializable DTO shape,
 * converting the Date columns to ISO strings.
 */
function serializeSnapshot(snapshot: IGrafanaSnapshotRow): IGrafanaSnapshot {
  return {
    ...snapshot,
    snapshot_from: snapshot.snapshot_from.toISOString(),
    snapshot_to: snapshot.snapshot_to.toISOString(),
    created_at: snapshot.created_at.toISOString(),
  };
}

export const getRecentSnapshot = async (
  request: Request,
  response: Response<RecentSnapshotResponseDTO>,
) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "snapshot.controller.ts",
    request,
    response,
  );

  logger.info(`ENTRY - ${request.method} ${request.url}`);
  const snapshot =
    await backendController.databaseService.getRecentSnapshot();

  const data: RecentSnapshotResponseDTO = {
    data: snapshot ? serializeSnapshot(snapshot) : null,
    message: "OK",
    uptime: process.uptime() + " seconds",
  };
  logger.info(`EXIT - ${request.method} ${request.url} - 200`);

  return response.status(200).json(data);
};

export const createSnapshot = async (
  request: Request<Record<string, string>, unknown, CreateSnapshotRequestDTO>,
  response: Response<CreateSnapshotResponseDTO | { error: string }>,
) => {
  const { url, label, password, snapshot_from, snapshot_to } = request.body;

  const logger = createApplicationLogger(
    "snapshot.controller.ts",
    request,
    response,
  );

  logger.info(`ENTRY - ${request.method} ${request.url}`);

  if (!url || !label || !password || !snapshot_from || !snapshot_to) {
    logger.warn("Missing required fields");
    return response
      .status(400)
      .json({ error: "url, label, snapshot_from, snapshot_to, and password are required" });
  }

  const fromDate = new Date(snapshot_from);
  const toDate = new Date(snapshot_to);
  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
    return response
      .status(400)
      .json({ error: "snapshot_from and snapshot_to must be valid ISO date strings" });
  }

  if (!validateSnapshotPassword(password)) {
    logger.warn("Invalid password attempt for snapshot creation");
    return response.status(401).json({ error: "Invalid password" });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return response.status(400).json({ error: "Invalid URL format" });
  }
  if (parsed.protocol !== "https:") {
    return response.status(400).json({ error: "URL must use HTTPS" });
  }

  if (parsed.hostname !== "snapshots.raintank.io") {
    return response
      .status(400)
      .json({ error: "URL must be a Grafana public snapshot (snapshots.raintank.io)" });
  }

  const backendController = request.app.locals
    .backendController as BackendController;

  let snapshot: Awaited<
    ReturnType<typeof backendController.databaseService.createSnapshot>
  >;
  try {
    snapshot = await backendController.databaseService.createSnapshot(
      url,
      label,
      fromDate,
      toDate,
    );
  } catch (error) {
    // Prisma P2002 = unique constraint violation (url is @unique).
    if ((error as { code?: string }).code === "P2002") {
      logger.warn(`Snapshot URL already exists: ${url}`);
      return response
        .status(409)
        .json({ error: "A snapshot with this URL already exists" });
    }
    throw error;
  }

  const data: CreateSnapshotResponseDTO = {
    data: serializeSnapshot(snapshot),
    message: "Snapshot created successfully",
    uptime: process.uptime() + " seconds",
  };
  logger.info(`EXIT - ${request.method} ${request.url} - 201`);

  return response.status(201).json(data);
};
