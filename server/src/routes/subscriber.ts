import express from "express";
import { NextFunction, Request, Response } from "express";

// Assuming subscriberController is properly typed or any adjustments are made for TypeScript
import * as subscriberController from "../controllers/subscriber";

const router = express.Router();

// Assuming getSubscriberPage is properly typed in your subscriber controller
router.get("/", subscriberController.getSubscriberPage);

export default router;
