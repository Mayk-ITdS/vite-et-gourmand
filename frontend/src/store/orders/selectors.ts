import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../store";

import { calculateOrderPrice } from "./funcs";

const emptyPricing = {
  base: 0,
  discount: 0,
  delivery: 0,
  ht: 0,
  tva: 0,
  ttc: 0,
  discountEligible: false,
};

export const selectOrderPricing = createSelector(
  [
    (state: RootState) => state.orders.selectedMenu,
    (state: RootState) => state.orders.prestation,
  ],
  (menu, prestation) => {
    if (!menu || !prestation) return emptyPricing;

    return calculateOrderPrice({
      unitPrice: menu.prix_unitaire,
      persons: menu.min_persons,
      minPersons: menu.min_persons,
      city: prestation.city,
      distanceKm: prestation.distanceKm,
    });
  },
);

/*

Redux robi memoizację

Logika jest czysta

Możesz testować pricing bez store

Backend może używać tej samej logiki

Slice jest czysty

UI jest reaktywne

*/
