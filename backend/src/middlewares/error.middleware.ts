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
  const sanitizePayload = (body: unknown) => {
    if (!body || typeof body !== "object") {
      return body;
    }

    const sensitiveKeys = [
      "password",
      "password_hash",
      "token",
      "accessToken",
      "refreshToken",
      "authorization",
    ];

    const clone = { ...(body as Record<string, unknown>) };

    for (const key of sensitiveKeys) {
      if (key in clone) {
        clone[key] = "[REDACTED]";
      }
    }

    return clone;
  };
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
    payload: sanitizePayload(req.body),
  });

  return res.status(statusCode).json({
    success: false,
    message,
  });
};
export default globalErrorHandler;
