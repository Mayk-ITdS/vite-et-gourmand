type Regime = "Vegetarien" | "Vegan" | "Classique";
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
  regime: Regime;
  images: string[];
  dishes: Dish[];
  minPeople: number;
  minPrice: number;
  conditions: string;
  stock: number;
}
type MenuTheme =
  | "Noel"
  | "Paques"
  | "Classique"
  | "Evenement"
  | "Soiree romantique";
type MenuRegime = "Vegetarien" | "Vegan" | "Classique";

type FiltersState = {
  priceMax?: number;
  priceMin?: number;
  priceRangeMax?: number;
  theme?: MenuTheme | "all";
  regime?: MenuRegime | "all";
  minPeople?: number;
  maxPeople?: number;
  rangePeople?: number[];
};

type Section = {
  id: string;
  label: string;
  render: (
    state: FiltersState,
    setState: React.Dispatch<React.SetStateAction<FiltersState>>
  ) => React.ReactNode;
};
export {
  themeValues,
  type ThemeValue,
  type Regime,
  type Menu,
  type FiltersState,
  type Section,
  type MenuRegime,
  type MenuTheme,
  type Dish,
  type DishCategory,
  type Allergen,
};
