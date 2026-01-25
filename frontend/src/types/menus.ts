export type Theme = "Noel" | "Paques" | "Classique" | "Evenement";
export type Regime = "Vegetarien" | "Vegan" | "Classique";

export type Allergen =
  | "Gluten"
  | "Lactose"
  | "Oeuf"
  | "Arachide"
  | "Fruits_a_coque"
  | "Poisson"
  | "Crustaces";

export type DishCategory = "Entree" | "Plat" | "Dessert";

export interface Dish {
  id: string;
  name: string;
  category: DishCategory;
  allergens?: Allergen[];
}

export interface Menu {
  id: string;
  title: string;
  description: string;
  theme: Theme;
  regime: Regime;
  images: string[];
  dishes: Dish[];
  minPeople: number;
  minPrice: number;
  conditions: string;
  stock: number;
}
export type MenuTheme = "Noel" | "Paques" | "Classique" | "Evenement";
export type MenuRegime = "Vegetarien" | "Vegan" | "Classique";

export type FiltersState = {
  priceMax?: number; // prix maximum
  priceMin?: number; // fourchette min
  priceRangeMax?: number; // fourchette max
  theme?: MenuTheme | "all";
  regime?: MenuRegime | "all";
  minPeople?: number;
  maxPeople?: number;
  rangePeople?: number[];
};

export type Section = {
  id: string;
  label: string;
  // tu będzie komponent/JSX sekcji
  render: (
    state: FiltersState,
    setState: React.Dispatch<React.SetStateAction<FiltersState>>
  ) => React.ReactNode;
};
