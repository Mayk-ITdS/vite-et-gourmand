import { pgPool } from "../../config/db.js";
import { SeedMenuItems } from "../../types/menus/maneuItems.js";

import { makeCode } from "../helpers.js";

export const seedItemsDB = async (items: SeedMenuItems[]) => {
  const payload = items.map((i, k) => ({
    item_code: makeCode("MIT", k + 1, 4),
    item_name: i.item_name,
    item_type: i.item_type,
    min_persons: i.min_persons,
    is_active: i.is_active,
    served_window: i.served_window,
    diet_type: i.diet_type,
    min_preparation_time: i.min_preparation_time,
    in_stock: i.in_stock,
    image_url: i.image_url,
  }));

  const sql = `
    INSERT INTO menu_items(
      item_code,
      item_name,
      item_type,
      min_persons,
      is_active,
      served_window,
      diet_type,
      min_preparation_time,
      in_stock,
      image_url
    )
    SELECT
      i.item_code,
      i.item_name,
      i.item_type::item_type_enum,
      i.min_persons,
      i.is_active,
      i.served_window::int4range,
      i.diet_type::diet_enum,
      i.min_preparation_time::interval,
      i.in_stock,
      i.image_url
    FROM jsonb_to_recordset($1::jsonb) AS i(
      item_code TEXT,
      item_name TEXT,
      item_type TEXT,
      min_persons INT,
      is_active BOOLEAN,
      served_window int4range,
      diet_type TEXT,
      min_preparation_time TEXT,
      in_stock BIGINT,
      image_url TEXT
    )
    ON CONFLICT (item_code) DO UPDATE SET
      item_name = EXCLUDED.item_name
    RETURNING item_id, item_name;
  `;

  const res = await pgPool.query(sql, [JSON.stringify(payload)]);

  const itemMap = new Map<string, number>();
  res.rows.forEach((r) => itemMap.set(r.item_name, r.item_id));

  return itemMap;
};
