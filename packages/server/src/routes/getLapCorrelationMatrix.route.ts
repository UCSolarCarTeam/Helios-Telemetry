import express from "express";

import * as controllers from "@/controllers/routeControllers/getLapCorrelationMatrix.controller";

const getLapCorrelationMatrixRouter = express.Router();

getLapCorrelationMatrixRouter.get(
  "/getLapCorrelationMatrix",
  controllers.getLapCorrelationMatrix,
);

export default getLapCorrelationMatrixRouter;
