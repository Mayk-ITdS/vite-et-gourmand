import { ApiError } from "../types/users.js";
import { isPgError } from "./isPgerror.js";

const mapPostgresError = (error: unknown): ApiError => {
  if (!isPgError(error)) {
    return new ApiError(500, "Unknown database error", false);
  }
  switch (error.code) {
    case "23503":
      return new ApiError(
        400,
        "Invalid reference: related resource does not exist",
        true,
      );

    case "23514":
      return new ApiError(
        400,
        "Invalid data: database constraint rejected the request",
        true,
      );

    case "23505":
      return new ApiError(409, "Conflict: resource already exists", true);

    case "23502":
      return new ApiError(400, "Missing required database field", true);

    default:
      return new ApiError(500, "Database operation failed", false);
  }
};
export default mapPostgresError;
