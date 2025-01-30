import express from "express";

import * as controllers from "@/controllers/routeControllers/lap.controller";

const lapRouter = express.Router();

lapRouter.get("/laps", controllers.getLapData);
lapRouter.get("/laps/health", controllers.getHealthLapData);

export default lapRouter;
