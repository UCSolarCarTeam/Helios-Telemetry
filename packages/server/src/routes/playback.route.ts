import express from "express";

import * as controllers from "@/controllers/routeControllers/playback.controller";

const playbackRouter = express.Router();

playbackRouter.get("/packet", controllers.getPacket);
playbackRouter.get("/packetsBetween", controllers.getPacketDataBetweenDates);
playbackRouter.get("/firstAndLastPacket", controllers.getFirstAndLastPacket);
playbackRouter.get("playback/health", controllers.getHealthPlayback);

export default playbackRouter;
