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

interface Menu {
  id: string;
  title: string;
  description: string;
  theme: ThemeValue;
  regime: RegimeValue[];
  images: string[];
  dishes: Dish[];
  minPeople: number;
  minPrice: number;
  conditions: string;
  stock: number;
}
type MenuRegime = "Vegetarien" | "Vegan" | "Classique";

type FiltersState = {
  priceMax: number | null;
  priceMin: number | null;
  priceRangeMax?: number;
  theme?: ThemeValue[];
  regime?: MenuRegime[];
  minPeople?: number | null;
  maxPeople?: number | null;
  rangePeople?: number[] | null;
};

export {
  themeValues,
  type ThemeValue,
  type RegimeValue,
  type Menu,
  type FiltersState,
  type MenuRegime,
  type Dish,
  type DishCategory,
  type Allergen,
};
