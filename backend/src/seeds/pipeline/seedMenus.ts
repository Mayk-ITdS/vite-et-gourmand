import { PoolClient } from "pg";
import { SeedMenusDB } from "../../types/menus/menus.js";
import { makeCode } from "../helpers.js";

export const seedMenus = async (client: PoolClient, menus: SeedMenusDB[]) => {
  const payload = menus.map((m, i) => ({
    ...m,
    menu_code: makeCode("MNU", i + 1, 4),
  }));

  const sql = `
    INSERT INTO menus(
      menu_code,
      menu_name,
      prix_unitaire,
      description,
      diet_type,
      min_persons,
      order_lead_time,
      quantity_in_stock,
      min_preparation_time,
      image_url,
      images
    )
    SELECT
      d.menu_code,
      d.menu_name,
      d.prix_unitaire,
      d.description,
      d.diet_type::diet_enum,
      d.min_persons,
      d.order_lead_time::interval,
      d.quantity_in_stock,
      d.min_preparation_time::interval,
      d.image_url,
      d.images
    FROM jsonb_to_recordset($1::jsonb) AS d(
      menu_code TEXT,
      menu_name TEXT,
      prix_unitaire NUMERIC,
      description TEXT,
      diet_type TEXT,
      min_persons INT,
      order_lead_time TEXT,
      quantity_in_stock BIGINT,
      min_preparation_time TEXT,
      image_url TEXT,
      images TEXT[],
      items JSONB,
      themes JSONB
    )
    ON CONFLICT (menu_code) DO UPDATE SET
      menu_name = EXCLUDED.menu_name
    RETURNING menu_id, menu_code;
  `;

  const res = await client.query(sql, [JSON.stringify(payload)]);

  const menuMap = new Map<string, number>();
  res.rows.forEach((r) => menuMap.set(r.menu_code, r.menu_id));

  return {
    inserted: res.rowCount ?? 0,
    menuMap,
  };
};
