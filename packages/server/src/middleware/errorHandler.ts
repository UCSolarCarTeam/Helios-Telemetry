import { type NextFunction, type Request, type Response } from "express";

import { createApplicationLogger } from "@/utils/logger";

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const logger = createApplicationLogger("errorHandler", req, res);

  logger.error(`ERROR - ${req.method} ${req.url} - ${err.message}`);
  if (err.stack) {
    logger.error(`Stack trace: ${err.stack}`);
  }

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
