import { pgPool } from "../config/db.js";
import { MenuPatchBody } from "../types/menus/menus.js";
import { ApiError } from "../types/users.js";

class MenuRepository {
  deleteOne = async (id: number) => {
    const sql = `DELETE FROM menus where menu_id = $1 RETURNING menu_id `;
    const result = await pgPool.query(sql, [id]);
    if (result.rowCount === 0) {
      throw new ApiError(404, "Menu introuvable");
    }
    return result.rows[0];
  };
  patchOne = async (id: number, payload: MenuPatchBody) => {
    console.log("to jest body do update", payload);
    const allowedFields: Array<keyof MenuPatchBody> = [
      "menu_code",
      "menu_name",
      "prix_unitaire",
      "description",
      "diet_type",
      "min_persons",
      "order_lead_time",
      "quantity_in_stock",
      "min_preparation_time",
      "image_url",
      "images",
    ];
    const fieldsToUpdate = allowedFields.filter((field) => payload[field] != undefined);
    if (!fieldsToUpdate.length) {
      throw new ApiError(400, "Aucun champ à mettre à jour");
    }
    const setClause = fieldsToUpdate
      .map((field, index) => {
        if (field === "order_lead_time" || field === "min_preparation_time") {
          return `${field} = $${index + 1}::interval`;
        }
        return `${field} = $${index + 1}`;
      })
      .join(", ");

    const valuesReady = fieldsToUpdate.map((field) => payload[field]);
    const sql = `UPDATE menus set ${setClause} where menu_id = $${fieldsToUpdate.length + 1} RETURNING *`;
    const result = await pgPool.query(sql, [...valuesReady, id]);

    return result.rows[0];
  };
}
export default new MenuRepository();
