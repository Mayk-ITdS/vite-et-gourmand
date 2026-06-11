import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";
import EmployeeController from "../controllers/EmployeeController.js";

const router = Router();

router.get(
  "/orders",
  authMiddleware,
  authorize(["employee", "admin"]),
  EmployeeController.getOrders,
);

router.patch(
  "/orders/:id/status",
  authMiddleware,
  authorize(["employee", "admin"]),
  EmployeeController.confirmOrder,
);

export default router;
