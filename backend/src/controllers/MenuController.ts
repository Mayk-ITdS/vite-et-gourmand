import type { Request, Response } from "express";
import { MenuService } from "../services/MenuService.js";
import { ApiError } from "../types/users.js";

class MenuController {
  constructor(private menuService = new MenuService()) {}
  getAllMenus = async (_req: Request, res: Response) => {
    try {
      const data = await this.menuService.getAllMenus();

      return res.json({ data });
    } catch (e) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  getMenuById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const data = await this.menuService.getOneMenuByID(id);
      if (!data) {
        return res.status(404).json({ message: "Menu not found" });
      }
      return res.status(200).json({ data });
    } catch (e) {
      throw new ApiError(500, String(e), false);
    }
  };
}
export { MenuController };
