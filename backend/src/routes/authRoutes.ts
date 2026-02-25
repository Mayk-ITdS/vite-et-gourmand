import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import AuthController from "../controllers/AuthController.js";
import { authorize } from "../middlewares/authorize.js";
import { MenuController } from "../controllers/MenuController.js";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/me", authMiddleware, AuthController.me);
// router.put(
//   "/menus/:id",
//   authMiddleware,
//   authorize(["admin"]),
//   MenuController.updateMenu,
// );

// router.get(
//   "/admin/data",
//   authMiddleware,
//   requireRole(["admin"]),
//   new AdminController.data(),
// );
// router.get(
//   "/admin/stats",
//   authMiddleware,
//   requireRole(["admin"]),
//   AdminController.stats,
// );

export default router;
