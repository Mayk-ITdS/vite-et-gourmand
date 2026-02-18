import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/store/store";
import type { MenuWithGallery, FiltersState } from "@/types/menus";

export const selectFilteredMenus = (
  state: RootState,
  filters: FiltersState,
) => {
  const menus = state.menus.list.data;

  return menus.filter((d: MenuWithGallery) => {
    const [minPeople, maxPeople] = filters.rangePeople ?? [null, null];

    const conds = [
      !maxPeople || maxPeople >= d.min_persons,
      !minPeople || minPeople <= d.min_persons,

      filters.themes.length === 0 ||
        filters.themes.some((t) => d.themes.includes(t)),

      filters.regime.length === 0 ||
        (Array.isArray(d.diet_type) ? d.diet_type : [d.diet_type]).some((r) =>
          filters.regime.includes(r),
        ),

      !filters.priceMin || filters.priceMin <= d.prix_unitaire,
      !filters.priceMax || filters.priceMax >= d.prix_unitaire,
    ];

    return conds.every(Boolean);
  });
};

export const selectMenuList = (state: RootState) => state.menus.list.data;

export const selectMenuById = createSelector(
  [selectMenuList, (_: RootState, menuId: number) => menuId],
  (menus, menuId) => {
    return menus.find((m) => Number(m.menu_id) === Number(menuId));
  },
);

export const selectMenuDetails = (state: RootState) => state.menus.details.data;
