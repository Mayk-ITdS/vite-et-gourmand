import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { requireRole } from "../middlewares/requireRole.js";
import AdminController from "../controllers/AdminController.js";
import { authorize } from "../middlewares/authorize.js";
console.log("ADMIN ROUTES LOADED");
const router = Router();
router.get(
  "/analytics",
  authMiddleware,
  authorize(["admin"]),
  AdminController.getDashboard,
);
router.get(
  "/dashboard",
  authMiddleware,
  authorize(["admin", "employee"]),
  AdminController.getDashboard,
);

router.get("/analytics", (req, res) => {
  console.log("ANALYTICS ROUTE HIT");
  res.json({ ok: true });
});
export default router;
