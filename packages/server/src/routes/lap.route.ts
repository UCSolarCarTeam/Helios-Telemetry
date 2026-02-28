import express from "express";

import * as controllers from "@/controllers/routeControllers/lap.controller";

import { asyncHandler } from "@/middleware/errorHandler";

const lapRouter = express.Router();

lapRouter.get("/laps", asyncHandler(controllers.getLapData));
lapRouter.get("/laps/health", controllers.getHealthLapData);

export default lapRouter;
