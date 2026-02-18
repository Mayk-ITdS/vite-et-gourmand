import { NextFunction, Response } from "express";
import { UserRequest } from "../types/users.js";

export const authorize =
  (allowedRoles: ("admin" | "employee" | "user")[]) =>
  (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.user_role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
