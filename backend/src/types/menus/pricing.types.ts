type MenuInput = {
  menuId: number;
  quantity: number;
};
type PricingBreakdown = {
  menus: {
    menuId: number;
    quantity: number;
    unitPrice: number;
    base: number;
    discount: number;
    final: number;
    discountApplied: boolean;
  }[];
  totalHT: number;
  tva: number;
  totalTTC: number;
};

type MenuFromDB = {
  menu_id: number;
  prix_unitaire: number;
  min_persons: number;
};
export { type MenuInput, type MenuFromDB, type PricingBreakdown };
