export type DietType = "Vegetarien" | "Vegan" | "Classique";

export type ProductType = "raw" | "semi" | "finished";

export type DeliveryMode = "lineage" | "synthesis";

export type ProductUnit = "kg" | "g" | "l" | "ml" | "szt";

export type IngredientUnit = ProductUnit;

export interface RawDeliveryDraft {
  product_name: string;
  product_type: "raw";
  diet_type: DietType;
  calories: string;
  price_lot: string;
  lot_quantity: string;
  producer_name: string;
  arrival_date: string;
  expiration_date: string;
  unit: ProductUnit;
}

export interface IngredientDraft {
  ingredient_name: string;
  diet_type: DietType;
  calories: string;
  quantity: string;
  unit: IngredientUnit;
}

export interface SynthesisDeliveryDraft {
  product_name: string;
  product_type: "semi" | "finished";
  price_lot: string;
  lot_quantity: string;
  diet_type: DietType;
  producer_name: string;
  arrival_date: string;
  expiration_date: string;
  unit: ProductUnit;
  ingredients: IngredientDraft[];
}

export interface RecentStockLot {
  id: number;
  productName: string;
  type: ProductType;
  producerName: string;
  quantity: number;
  unit: ProductUnit;
  arrivalDate: string;
  expirationDate: string;
  status: "arrived" | "delayed" | "departed" | "ordered" | "pending";
}
