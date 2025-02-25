import express from "express";

import * as controllers from "@/controllers/routeControllers/playback.controller";

const playbackRouter = express.Router();

playbackRouter.get("/playbackData", controllers.getPlaybackData);
playbackRouter.get("/firstAndLastPacket", controllers.getFirstAndLastPacket);
playbackRouter.get("playback/health", controllers.getHealthPlayback);


export default playbackRouter;
