const regimeValues = ["Vegetarien", "Vegan", "Classique"] as const;
type RegimeValue = (typeof regimeValues)[number];
const themeValues = [
  "Tradition Française",
  "Haute Sélection",
  "Garden Party",
  "Vernissage",
  "Dîner Privé",
  "Anniversaire Élégant",
  "Événement Entreprise",
  "Soirée Romantique",
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
export type ItemType = "starter" | "main" | "dessert" | "drink";

interface Dish {
  id: string;
  name: string;
  category: DishCategory;
  allergens?: Allergen[];
}
// interface Menu {
//   description: string;
//   diet_type: RegimeValue | RegimeValue[];
//   menu_id: string | null;
//   menu_name: string;
//   min_persons: number;
//   order_lead_time: string;
//   min_preparation_time: number;
//   prix_unitaire: number;
//   quantity_in_stock: number;
//   themes?: ThemeValue[];
//   items?: Partial<Record<ItemType, string>>;
//   images: [
//     "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
//     "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9",
//   ];
//   image_url: string;
// }
type MenuItem = {
  item_id: number;
  item_name: string;
  item_type: "starter" | "main" | "dessert" | "drink";
  diet_type: string;
  min_preparation_time: number;
};

type MenuWithGallery = {
  menu_id: number;
  menu_name: string;
  description: string;
  prix_unitaire: number;
  image_url: string;
  images: string[];
  diet_type: string;
  min_persons: number;
  order_lead_time: string;
  quantity_in_stock: number;
  min_preparation_time: number;
  themes: string[];
  items: MenuItem[];
};

// interface MenuFinal {
//   menu_id: string;
//   menu_name: string;
//   description: string;
//   theme: ThemeValue;
//   regime: RegimeValue[];
//   images: string[];
//   dishes: Dish[];
//   minPeople: number;
//   minPrice: number;
//   conditions: string;
//   stock: number;
// }

type FiltersState = {
  priceMax: number | null;
  priceMin: number | null;
  priceRangeMax?: number;
  themes: ThemeValue[];
  regime: RegimeValue[];
  minPeople: number | null;
  maxPeople: number | null;
  rangePeople: number[] | null;
};

type Section = {
  id: string;
  label: string;
  render: (
    state: FiltersState,
    setState: React.Dispatch<React.SetStateAction<FiltersState>>,
  ) => React.ReactNode;
};

export {
  themeValues,
  regimeValues,
  type ThemeValue,
  type RegimeValue,
  // type Menu,
  type MenuItem,
  type MenuWithGallery,
  type FiltersState,
  type Section,
  type Dish,
  type DishCategory,
  type Allergen,
};
