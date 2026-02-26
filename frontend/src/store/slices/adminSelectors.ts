import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const selectDashboard = (state: RootState) => state.adminAnalytics.data;

export const selectTotalRevenue = createSelector(
  [selectDashboard],
  (data) => data?.months?.reduce((sum, m) => sum + m.totalRevenue, 0) ?? 0,
);

export const selectTotalOrders = createSelector(
  [selectDashboard],
  (data) => data?.statuses?.reduce((sum, s) => sum + s.count, 0) ?? 0,
);

export const selectAverageRevenue = createSelector(
  [selectTotalRevenue, selectTotalOrders],
  (revenue, orders) => (orders === 0 ? 0 : revenue / orders),
);
