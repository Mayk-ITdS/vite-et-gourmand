import { DietType } from "../../dtos/ingest.dto.js";
import type { Request } from "express";
const regimeValues = ["Vegetarien", "Vegan", "Classique"] as const;
type RegimeValue = (typeof regimeValues)[number];
const themeValues = [
  "all",
  "Noël",
  "Pâques",
  "Classique",
  "Événement",
  "Soirée romantique",
] as const;

type ThemeValue = (typeof themeValues)[number];
type Allergen =
  | "Gluten"
  | "Lactose"
  | "Oeuf"
  | "Arachide"
  | "Fruits_a_coque"
  | "Poisson"
  | "Crustaces";

type DishCategory = "Entree" | "Plat" | "Dessert";

interface Dish {
  id: string;
  name: string;
  category: DishCategory;
  allergens?: Allergen[];
}

type Diet = "Vegetarien" | "Vegan" | "Classique";
type ItemType = "starter" | "main" | "dessert" | "drink";

type FiltersState = {
  priceMax: number | null;
  priceMin: number | null;
  priceRangeMax?: number;
  theme: ThemeValue[];
  regime: Diet[];
  minPeople: number | null;
  maxPeople: number | null;
  rangePeople: number[] | null;
};
interface SeedMenusDB {
  menu_code?: string;
  menu_name: string;
  prix_unitaire: number;
  description: string;
  diet_type: Diet | string;
  min_persons: number;
  order_lead_time: string;
  quantity_in_stock: number;
  min_preparation_time: string;
  images: string[];
  image_url: string;
  themes: string[];
  items: {
    starter: string;
    main: string;
    dessert: string;
    drink: string;
  };
}
export type MenuCreateBody = {
  menu_code?: string;
  menu_name: string;
  prix_unitaire: number;
  description?: string | null;
  diet_type: DietType;
  min_persons?: number | null;
  order_lead_time?: string | null;
  quantity_in_stock?: number | null;
  min_preparation_time?: string | null;
  image_url?: string | null;
  images?: string[];
  is_active?: boolean;
};

export type MenuPatchBody = Partial<MenuCreateBody>;

export type IdParams = {
  id: string;
};

export type MenuCreateRequest = Request<{}, unknown, MenuCreateBody>;
export type MenuPatchRequest = Request<IdParams, unknown, MenuPatchBody>;
export type MenuDeleteRequest = Request<IdParams>;

interface SeedMenuComposition {
  menu_code: string;
  items: {
    item_code: string;
    quantity: number;
  }[];
}
interface SeedMenuThemes {
  menu_code: string;
  themes: string[];
}
export {
  themeValues,
  type ThemeValue,
  type RegimeValue,
  type FiltersState,
  type Diet,
  type ItemType,
  type Dish,
  type DishCategory,
  type Allergen,
  type SeedMenusDB,
  type SeedMenuComposition,
  type SeedMenuThemes,
};
