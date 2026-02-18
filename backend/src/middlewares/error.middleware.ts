import { Request, Response, NextFunction } from "express";
import pino from "pino";
import { ApiError } from "../types/users.js";

const logger = pino();

const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const isApiError = err instanceof ApiError;

  const statusCode = isApiError ? err.statusCode : 500;
  const message = isApiError ? err.message : "Internal Server Error";

  logger.error({
    msg: "Request processing failed",
    request: {
      method: req.method,
      url: req.url,
      ip: req.ip,
    },
    error: {
      message,
      stack: err instanceof Error ? err.stack : undefined,
    },
    payload: req.body,
  });

  return res.status(statusCode).json({
    success: false,
    message,
  });
};
export default globalErrorHandler;
