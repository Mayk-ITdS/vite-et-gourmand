import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
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
router.get(
  "/orders",
  authMiddleware,
  authorize(["admin", "employee"]),
  AdminController.getAdminOrders,
);
router.get("/menus", authMiddleware, authorize(["admin"]), AdminController.getMenus);
// router.post('menus',authMiddleware, authorize(['admin']), AdminController)
router.patch(
  "/menus/:id",
  authMiddleware,
  authorize(["admin"]),
  AdminController.patchMenu,
);
router.delete(
  "/menus/:id",
  authMiddleware,
  authorize(["admin"]),
  AdminController.deleteMenu,
);
router.delete(
  "/orders/:id",
  authMiddleware,
  authorize(["admin"]),
  AdminController.deleteOrder,
);
router.patch(
  "/orders/:id",
  authMiddleware,
  authorize(["admin"]),
  AdminController.patchOrderStatus,
);
router.get("/users", authMiddleware, authorize(["admin"]), AdminController.getUsers);
router.post(
  "/stock/ingest",
  authMiddleware,
  authorize(["admin"]),
  AdminController.stockIngestion,
);

export default router;
