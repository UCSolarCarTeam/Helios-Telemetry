import type { BackendController } from "../BackendController/BackendController";

import { type Request, type Response } from "express";

import { createApplicationLogger } from "@/utils/logger";
import { validateSnapshotPassword } from "@/utils/validatePassword";

import type {
  CreateSnapshotRequestDTO,
  CreateSnapshotResponseDTO,
  IGrafanaSnapshot,
  SnapshotListResponseDTO,
} from "@shared/helios-types";

/**
 * Maps a Prisma grafana_snapshot row to its serializable DTO shape,
 * converting the Date `created_at` to an ISO string.
 */
function serializeSnapshot(
  snapshot: Omit<IGrafanaSnapshot, "created_at"> & { created_at: Date },
): IGrafanaSnapshot {
  return { ...snapshot, created_at: snapshot.created_at.toISOString() };
}

export const getSnapshots = async (
  request: Request,
  response: Response<SnapshotListResponseDTO>,
) => {
  const backendController = request.app.locals
    .backendController as BackendController;

  const logger = createApplicationLogger(
    "snapshot.controller.ts",
    request,
    response,
  );

  logger.info(`ENTRY - ${request.method} ${request.url}`);
  const snapshots = await backendController.databaseService.getSnapshots();

  const data: SnapshotListResponseDTO = {
    data: snapshots.map(serializeSnapshot),
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
  const { url, label, password } = request.body;

  const logger = createApplicationLogger(
    "snapshot.controller.ts",
    request,
    response,
  );

  logger.info(`ENTRY - ${request.method} ${request.url}`);

  if (!url || !label || !password) {
    logger.warn("Missing required fields - url, label, or password");
    return response
      .status(400)
      .json({ error: "url, label, and password are required" });
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
