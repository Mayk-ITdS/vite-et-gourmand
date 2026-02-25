import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { requireRole } from "../middlewares/requireRole.js";
import { OrdersController } from "../controllers/OrdersController.js";

const router = Router();
router.get(
  "/me",
  authMiddleware,
  requireRole(["admin", "user"]),
  new OrdersController().getMyOrders,
);
router.post(
  "/me",
  authMiddleware,
  requireRole(["user"]),
  new OrdersController().saveNewOrders,
);
export default router;
