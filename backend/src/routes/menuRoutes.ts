import { Router } from "express";
import { MenuController } from "../controllers/MenuController.js";

const router = Router();

router.get("/", new MenuController().getAllMenus);
router.get("/:id", new MenuController().getMenuById);
export default router;
