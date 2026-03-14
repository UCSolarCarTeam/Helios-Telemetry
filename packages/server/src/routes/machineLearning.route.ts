import express from "express";

import * as controllers from "@/controllers/routeControllers/machineLearning.controller";

const machineLearningRouter = express.Router();

machineLearningRouter.get(
  "/ml/correlation-matrix/packet",
  controllers.getPacketCorrelationMatrix,
);
machineLearningRouter.get(
  "/ml/correlation-matrix/lap",
  controllers.getLapCorrelationMatrix,
);
machineLearningRouter.post("/ml/invalidate", controllers.invalidateCache);
machineLearningRouter.get("/ml/health", controllers.getHealthCorrelationMatrix);

export default machineLearningRouter;
