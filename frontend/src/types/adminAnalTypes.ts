export interface MenuStat {
  menuId: number;
  timesOrdered: number;
  totalRevenue: number;
}

export interface MonthStat {
  year: number;
  month: number;
  totalRevenue: number;
  oredersCount: number;
}

export interface StatusStat {
  status: string;
  count: number;
}
export interface AdminOverview {
  totalRevenue: number;
  totalOrders: number;
  averageRevenue: number;
  topMenuId: number;
}
export interface AdminDashboardPayload {
  overview: AdminOverview;
  menus: MenuStat[];
  months: MonthStat[];
  statuses: StatusStat[];
}
