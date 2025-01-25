import express from "express";

import * as controllers from "@/controllers/routeControllers/lap.controller";

const driverRouter = express.Router();

driverRouter.get("/driver/:rfid", controllers.getLapData);

export default driverRouter;
