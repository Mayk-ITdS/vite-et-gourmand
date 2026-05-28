import type {
  DeliveryMode,
  DietType,
  IngredientUnit,
  ProductType,
  ProductUnit,
} from "../supplyTypes";

export const initialStockFormValues: StockFormData = {
  product_name: "",
  product_type: "raw",
  price_lot: 0,
  lot_quantity: 0,
  diet_type: "Vegan",
  calories: 0,
  producer_name: "",
  arrival_date: "",
  expiration_date: "",
  unit: "kg",
  ingredients: [
    {
      ingredient_name: "",
      ingredient_diet_type: "Vegan",
      ingredient_calories: 0,
      ingredient_quantity: 0,
      ingredient_unit: "kg",
    },
  ],
};

interface IngredientFormData {
  ingredient_name: string;
  ingredient_diet_type: DietType;
  ingredient_calories: number;
  ingredient_quantity: number;
  ingredient_unit: IngredientUnit;
}

interface StockFormData {
  product_name: string;
  product_type: ProductType;
  price_lot: number;
  lot_quantity: number;
  diet_type: DietType;
  calories: number;
  producer_name: string;
  arrival_date: string;
  expiration_date: string;
  unit: ProductUnit;

  ingredients: IngredientFormData[];
}

const buildStockPayload = (data: StockFormData, mode: DeliveryMode) => {
  if (mode === "lineage") {
    return {
      raw_deliveries: [
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
      ],
    };
  }

  if (data.product_type === "raw") {
    throw new Error("Synthesis accepts only semi or finished products.");
  }

  return {
    semi_finished_deliveries: [
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
    ],
  };
};
export default buildStockPayload;
export { type IngredientFormData, type StockFormData };
