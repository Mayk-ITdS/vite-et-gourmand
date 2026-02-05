import MenuService from "../services/MenuService.js";
import type { Request, Response } from "express";

class MenuController {
  async getAllMenus(_req: Request, res: Response) {
    try {
      const data = await MenuService.getMenusList();

      return res.json({ data });
    } catch (e) {
      console.warn(e);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
export default new MenuController();
