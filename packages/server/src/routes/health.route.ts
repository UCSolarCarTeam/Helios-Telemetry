import express from "express";

import * as controllers from "@/controllers/routeControllers/health.controller";

const healthRouter = express.Router();

healthRouter.get("/health", controllers.getHealth);

export default healthRouter;
