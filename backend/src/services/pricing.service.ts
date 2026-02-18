import {
  MenuFromDB,
  MenuInput,
  PricingBreakdown,
} from "../types/menus/pricing.types.js";
import { ApiError } from "../types/users.js";

const TVA_RATE = 0.2;

export function calculatePricing(
  menusInput: MenuInput[],
  menusFromDb: MenuFromDB[],
): PricingBreakdown {
  let totalHT = 0;

  const results = menusInput.map((input) => {
    const dbMenu = menusFromDb.find(
      (m) => Number(m.menu_id) === Number(input.menuId),
    );

    if (!dbMenu) {
      throw new ApiError(404, "Menu not found in pricing calculation", false);
    }
    const unitPrice = Number(dbMenu.prix_unitaire);
    const base = unitPrice * input.quantity;
    let discount = 0;
    let discountApplied = false;

    if (input.quantity >= dbMenu.min_persons + 5) {
      discount = base * 0.1;
      discountApplied = true;
    }

    const final = base - discount;
    totalHT += final;

    return {
      menuId: input.menuId,
      quantity: input.quantity,
      unitPrice,
      base,
      discount,
      final,
      discountApplied,
    };
  });
  const tva = totalHT * TVA_RATE;
  const totalTTC = totalHT + tva;

  return {
    menus: results,
    totalHT,
    tva,
    totalTTC,
  };
}
