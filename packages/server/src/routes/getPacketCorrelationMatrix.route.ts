import express from "express";

import * as controllers from "@/controllers/routeControllers/getPacketCorrelationMatrix.controller";

const getPacketCorrelationMatrixRouter = express.Router();

getPacketCorrelationMatrixRouter.get(
  "/getPacketCorrelationMatrix",
  controllers.getPacketCorrelationMatrix,
);

export default getPacketCorrelationMatrixRouter;
