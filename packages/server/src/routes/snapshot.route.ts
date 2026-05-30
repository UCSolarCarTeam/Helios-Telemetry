import express from "express";

import * as controllers from "@/controllers/routeControllers/snapshot.controller";

import { asyncHandler } from "@/middleware/errorHandler";

const snapshotRouter = express.Router();

snapshotRouter.get("/snapshots", asyncHandler(controllers.getSnapshots));
snapshotRouter.post("/snapshots", asyncHandler(controllers.createSnapshot));

export default snapshotRouter;
