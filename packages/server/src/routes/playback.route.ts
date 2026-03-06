import express from "express";

import * as controllers from "@/controllers/routeControllers/playback.controller";

import { asyncHandler } from "@/middleware/errorHandler";

const playbackRouter = express.Router();

playbackRouter.get("/packet", asyncHandler(controllers.getPacket));
playbackRouter.get(
  "/packetsBetween",
  asyncHandler(controllers.getPacketDataBetweenDates),
);
playbackRouter.get(
  "/firstAndLastPacket",
  asyncHandler(controllers.getFirstAndLastPacket),
);
playbackRouter.get("playback/health", controllers.getHealthPlayback);

export default playbackRouter;
