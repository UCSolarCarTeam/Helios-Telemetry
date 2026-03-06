import express from "express";

import * as controllers from "@/controllers/routeControllers/driver.controller";

import { asyncHandler } from "@/middleware/errorHandler";

const driverRouter = express.Router();

driverRouter.get("/driver/:Rfid", asyncHandler(controllers.getDriverLaps));
driverRouter.get("/drivers", asyncHandler(controllers.getDrivers));
driverRouter.get("/drivers/health", controllers.getDriverHealth);
driverRouter.post(
  "/updatedriverinfo",
  asyncHandler(controllers.updateDriverInfo),
);

export default driverRouter;
