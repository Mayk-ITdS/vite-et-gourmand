import { pgPool } from "../config/db.js";

class MenuService {
  async getMenusList() {
    const sql = `Select * from menus`;
    const result = await pgPool.query(sql);
    return result.rows;
  }
}

export default new MenuService();
