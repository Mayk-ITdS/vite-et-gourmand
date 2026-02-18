import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { requireRole } from "../middlewares/requireRole.js";
import { AdminController } from "../controlllers/AdminController.js";

const router = Router();

router.get(
  "/dashboard",
  authMiddleware,
  requireRole(["admin"]),
  new AdminController().getDashboard,
);

export default router;
