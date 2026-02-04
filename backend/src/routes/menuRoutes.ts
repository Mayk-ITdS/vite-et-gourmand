import { Router } from "express";
import MenuService from "../services/MenuService.js";
import MenuController from "../controlllers/MenuController.js";

const router = Router();

router.get("/", MenuController.getAllMenus);

export default router;
