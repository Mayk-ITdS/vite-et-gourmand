import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { UserRequest } from "../types/users.js";
type AuthJwtPayload = {
  sub: number;
  role: "user" | "admin" | "employee";
};
function isAuthPayload(payload: unknown): payload is AuthJwtPayload {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "sub" in payload &&
    "role" in payload
  );
}
const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, ENV.JWT.SECRET) as unknown;

    if (!isAuthPayload(decoded)) {
      return res.status(401).json({ message: "Involid token" });
    }
    const payload = decoded as AuthJwtPayload;
    req.user = {
      user_id: payload.sub,
      user_role: payload.role,
    };
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
export default authMiddleware;
