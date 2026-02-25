import { PoolClient } from "pg";
import { SeedMenusDB } from "../../types/menus/menus.js";
import { makeCode } from "../helpers.js";

export const linkRelations = async (
  client: PoolClient,
  menus: SeedMenusDB[],
  itemMap: Map<string, number>,
  menuMap: Map<string, number>,
) => {
  const themeRes = await client.query(
    `SELECT theme_id, theme_name FROM themes`,
  );

  const themeMap = new Map<string, number>();
  themeRes.rows.forEach((t) => themeMap.set(t.theme_name, t.theme_id));

  for (let i = 0; i < menus.length; i++) {
    const menuCode = makeCode("MNU", i + 1, 4);
    const menuId = menuMap.get(menuCode);
    if (!menuId) continue;
    const menu = menus[i];

    for (const themeName of menu.themes) {
      const themeId = themeMap.get(themeName);
      if (!themeId) continue;

      await client.query(
        `INSERT INTO menu_themes(menu_id, theme_id)
         VALUES ($1,$2)
         ON CONFLICT DO NOTHING`,
        [menuId, themeId],
      );
    }

    for (const type of ["starter", "main", "dessert", "drink"] as const) {
      const itemName = menu.items[type];
      const itemId = itemMap.get(itemName);
      if (!itemId) continue;

      await client.query(
        `INSERT INTO menu_items_menus(menu_id, item_id, quantity)
         VALUES ($1,$2,1)
         ON CONFLICT DO NOTHING`,
        [menuId, itemId],
      );
    }
  }
};
