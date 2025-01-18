import express from "express";

import * as controllers from "@/controllers/routeControllers/lap.controller";

const lapRouter = express.Router();

lapRouter.get("/lap/:timestamp", controllers.getLapData);

export default lapRouter;
