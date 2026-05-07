import { StockDTO, StockMode } from "../dtos/ingest.dto.js";

const buildStockPayload = (data: StockDTO, mode: StockMode) => {
  if (mode === "lineage") {
    return [
      {
        product_name: data.product_name,
        product_type: "raw",
        diet_type: data.diet_type,
        calories: data.calories,
        price_lot: data.price_lot,
        lot_quantity: data.lot_quantity,
        producer_name: data.producer_name,
        arrival_date: data.arrival_date,
        expiration_date: data.expiration_date,
        unit: data.unit,
      },
    ];
  }

  if (data.product_type === "raw") {
    throw new Error("Synthesis accepts only semi or finished products.");
  }

  return [
    {
      product_name: data.product_name,
      product_type: data.product_type,
      diet_type: data.diet_type,
      calories: data.calories,
      price_lot: data.price_lot,
      lot_quantity: data.lot_quantity,
      producer_name: data.producer_name,
      arrival_date: data.arrival_date,
      expiration_date: data.expiration_date,
      unit: data.unit,

      ingredients: data.ingredients.map((ingredient) => ({
        ingredient_name: ingredient.ingredient_name,
        diet_type: ingredient.ingredient_diet_type,
        calories: ingredient.ingredient_calories,
        quantity: ingredient.ingredient_quantity,
        unit: ingredient.ingredient_unit,
      })),
    },
  ];
};
export default buildStockPayload;
