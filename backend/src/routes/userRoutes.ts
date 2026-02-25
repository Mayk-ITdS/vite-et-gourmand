import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { UsersController } from "../controllers/UserController.js";

const router = Router();
const controller = new UsersController();

router.get("/me", authMiddleware, controller.getMyProfile);
router.patch("/me", authMiddleware, controller.updateMyProfile);

export default router;
