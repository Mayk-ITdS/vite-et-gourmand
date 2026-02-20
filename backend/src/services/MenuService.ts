import { pgPool } from "../config/db.js";
import { StockRepository } from "../repositories/StockRepository.js";
import { ApiError } from "../types/users.js";
import { IngestProductsQuery } from "../types/stock.js";

class MenuService {
  constructor(private stockRepository = new StockRepository()) {}
  async instertMenus(
    mode: IngestProductsQuery["mode"],
    payload: IngestProductsQuery["payload"],
  ) {
    try {
      return await this.stockRepository.ingestStock(mode, payload);
    } catch (e) {
      throw new ApiError(
        400,
        e instanceof Error ? e.message : "Wrong data model",
      );
    }
  }
  async getAllMenus() {
    const res = await pgPool.query(
      `Select m.menu_id, 
      m.menu_name, 
      m.image_url,
      m.description, 
      m.prix_unitaire,
      m.images,
      m.diet_type,
      m.min_persons,
      m.order_lead_time,
      array_agg(DISTINCT t.theme_name) as themes, 
      json_agg(
  DISTINCT jsonb_build_object(
    'item_id', mi.item_id,
    'item_name', mi.item_name,
    'item_type', mi.item_type,
    'diet_type', mi.diet_type,
    'min_preparation_time', mi.min_preparation_time
  )
) AS items 
      from menus m 
      join menu_themes mt 
      on m.menu_id = mt.menu_id 
      join themes t 
      on mt.theme_id = t.theme_id 
      join menu_items_menus it 
      on m.menu_id = it.menu_id 
      join menu_items mi 
      on it.item_id = mi.item_id 
      group by m.menu_id,
              m.menu_name,
              m.description,
              m.prix_unitaire,
              m.diet_type,
              m.min_persons,
              m.order_lead_time,
              m.image_url,
              m.images
              ;
    `,
    );

    return res.rows;
  }
  async getOneMenuByID(id: number) {
    try {
      const data = await pgPool.query(
        `
      SELECT 
        m.menu_id,
        m.menu_name,
        m.image_url,
        m.description,
        m.prix_unitaire,
        m.images,
        m.diet_type,
        m.min_persons,
        m.quantity_in_stock,
        m.min_preparation_time,
        COALESCE(array_agg(DISTINCT t.theme_name)FILTER(WHERE t.theme_name IS NOT NULL),
        '{}' 
      )AS themes,
        COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'item_id', mi.item_id,
            'item_name', mi.item_name,
            'item_type', mi.item_type,
            'diet_type', mi.diet_type,
            'min_preparation_time', mi.min_preparation_time
           )
          )FILTER (WHERE mi.item_id IS NOT NULL),
          '[]'
        ) AS items
      FROM menus m
      LEFT JOIN menu_themes mt ON m.menu_id = mt.menu_id
      LEFT JOIN themes t ON mt.theme_id = t.theme_id
      LEFT JOIN menu_items_menus it ON m.menu_id = it.menu_id
      LEFT JOIN menu_items mi ON it.item_id = mi.item_id
      WHERE m.menu_id = $1
      GROUP BY 
        m.menu_id,
        m.menu_name,
        m.image_url,
        m.description,
        m.prix_unitaire,
        m.images,
        m.diet_type,
        m.min_persons,
        m.quantity_in_stock,
        m.min_preparation_time
      `,
        [id],
      );

      if (data.rowCount === 0) {
        throw new ApiError(404, "Menu non trouvé", true);
      }

      return data.rows[0];
    } catch (e) {
      throw new ApiError(500, e instanceof Error ? e.message : "Server error");
    }
  }
}

export { MenuService };
