import { PoolClient } from "pg";
import { seedProducts, itemIngredients } from "../data/stock.js";

/**
 * Seeds the raw products (ingredients) required by the Vegetarien and Classique
 * menus, registers each one in `products_ingredients`, and links them to the
 * matching menu items through `products_to_items`.
 *
 * @param itemMap Map of `item_name` -> `item_id` produced by seedMenuItems.
 */
export const seedStock = async (client: PoolClient, itemMap: Map<string, number>) => {
  // 1) Insert raw product lots. Dates are computed relatively to CURRENT_DATE
  //    so the products always satisfy the arrival/expiration check constraints.
  const productsSql = `
    INSERT INTO products(
      product_name,
      diet_type,
      product_type,
      price_lot,
      producer_name,
      lot_quantity,
      delivery_status,
      arrival_date,
      expiration_date,
      in_stock,
      unit
    )
    SELECT
      p.product_name,
      p.diet_type::diet_enum,
      'raw'::product_type_enum,
      p.price_lot,
      p.producer_name,
      p.lot_quantity,
      'arrived'::delivery_status_enum,
      CURRENT_DATE - 3,
      CURRENT_DATE + 60,
      p.in_stock,
      p.unit
    FROM jsonb_to_recordset($1::jsonb) AS p(
      product_name varchar(50),
      diet_type text,
      price_lot numeric,
      producer_name varchar(50),
      lot_quantity bigint,
      in_stock numeric,
      unit varchar(30)
    )
    RETURNING product_id, product_name;
  `;

  const productsRes = await client.query(productsSql, [JSON.stringify(seedProducts)]);

  // product_name is lowercased by a trigger, so RETURNING gives lowercase keys.
  const productMap = new Map<string, number>();
  productsRes.rows.forEach((r) =>
    productMap.set(String(r.product_name).toLowerCase(), r.product_id),
  );

  // 2) Register each product as its own ingredient (raw lineage).
  const ingredientsPayload = seedProducts
    .map((p) => {
      const productId = productMap.get(p.product_name.toLowerCase());
      if (!productId) return null;
      return {
        product_id: productId,
        ingredient_name: p.product_name,
        diet_type: p.diet_type,
        calories: p.calories,
        ingredient_unit: p.unit,
      };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);

  let ingredientsInserted = 0;
  if (ingredientsPayload.length > 0) {
    const ingredientsSql = `
      INSERT INTO products_ingredients(
        product_id,
        ingredient_name,
        ingredient_quantity,
        diet_type,
        calories,
        ingredient_unit
      )
      SELECT
        x.product_id,
        x.ingredient_name,
        1,
        x.diet_type::diet_enum,
        x.calories,
        x.ingredient_unit
      FROM jsonb_to_recordset($1::jsonb) AS x(
        product_id bigint,
        ingredient_name varchar(50),
        diet_type text,
        calories numeric,
        ingredient_unit varchar(10)
      )
      ON CONFLICT (product_id, ingredient_name, ingredient_unit) DO NOTHING;
    `;
    const res = await client.query(ingredientsSql, [JSON.stringify(ingredientsPayload)]);
    ingredientsInserted = res.rowCount ?? 0;
  }

  // 3) Link products to the menu items they compose.
  const linksPayload: { product_id: number; item_id: number; quantity: number }[] = [];

  for (const [itemName, lines] of Object.entries(itemIngredients)) {
    const itemId = itemMap.get(itemName);
    if (!itemId) {
      console.warn(`seedStock: menu item not found, skipped -> "${itemName}"`);
      continue;
    }
    for (const line of lines) {
      const productId = productMap.get(line.product.toLowerCase());
      if (!productId) {
        console.warn(`seedStock: product not found, skipped -> "${line.product}"`);
        continue;
      }
      linksPayload.push({
        product_id: productId,
        item_id: itemId,
        quantity: line.quantity,
      });
    }
  }

  let linksCreated = 0;
  if (linksPayload.length > 0) {
    const linksSql = `
      INSERT INTO products_to_items(product_id, item_id, quantity)
      SELECT y.product_id, y.item_id, y.quantity
      FROM jsonb_to_recordset($1::jsonb) AS y(
        product_id bigint,
        item_id bigint,
        quantity numeric
      )
      ON CONFLICT (product_id, item_id) DO NOTHING;
    `;
    const res = await client.query(linksSql, [JSON.stringify(linksPayload)]);
    linksCreated = res.rowCount ?? 0;
  }

  return {
    productsInserted: productsRes.rowCount ?? 0,
    ingredientsInserted,
    linksCreated,
  };
};
