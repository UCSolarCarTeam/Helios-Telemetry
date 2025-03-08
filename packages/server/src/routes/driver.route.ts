import express from "express";

import * as controllers from "@/controllers/routeControllers/driver.controller";

const driverRouter = express.Router();

driverRouter.get("/driver/:rfid", controllers.getDriverLaps);
driverRouter.get("/drivers", controllers.getDrivers);
driverRouter.get("/drivers/health", controllers.getDriverHealth);
driverRouter.post("/updatedriverinfo", controllers.updateDriverInfo);

export default driverRouter;
