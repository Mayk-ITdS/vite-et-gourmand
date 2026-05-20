import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import AuthController from "../controllers/AuthController.js";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/me", authMiddleware, AuthController.me);

export default router;
