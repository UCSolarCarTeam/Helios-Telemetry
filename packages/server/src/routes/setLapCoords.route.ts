import express from "express";

import * as controllers from "@/controllers/routeControllers/setLapCoords.controller";

const lapRouter = express.Router();

lapRouter.post("/setLapCoords", controllers.receiveCoords);

export default lapRouter;
