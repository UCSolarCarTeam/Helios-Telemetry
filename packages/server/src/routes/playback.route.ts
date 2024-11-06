import express from "express";

import * as controllers from "@/controllers/routeControllers/playback.controller";

const playbackRouter = express.Router();

playbackRouter.get("/getFirstAndLastPacketDates", controllers.getFirstAndLastPacketDates);

export default playbackRouter;
