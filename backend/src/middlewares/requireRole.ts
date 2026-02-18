import { NextFunction, Response } from "express";
import { UserRequest } from "../types/users.js";

export const requireRole = (roles: string[]) => {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.user_role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
