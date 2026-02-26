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

export interface AdminDashboardPayload {
  menus: MenuStat[];
  months: MonthStat[];
  statuses: StatusStat[];
}
