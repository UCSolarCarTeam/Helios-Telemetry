import express from "express";

import * as controllers from "@/controllers/health.controller";

const router = express.Router();

router.get("/health", controllers.getHealth);

export default router;
