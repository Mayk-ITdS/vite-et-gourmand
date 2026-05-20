export interface OrderRow {
  res_id: number;
  status: string;
}
export interface MonthStat {
  year: number;
  month: number;
  totalRevenue: number;
  ordersCount: number;
}
export type CreateOrderDTO = {
  menus: {
    menuId: number;
    quantity: number;
  }[];
  prestation: {
    address: string;
    city: string;
    date: string;
    time: string;
  };
};
export type OrderStatus = "pending" | "confirmed" | "cancelled" | "completed";
export type OrderHistoryItemDTO = {
  status: OrderStatus;
  changedAt: string;
  changedBy: number | null;
};
export type UserOrderRow = {
  res_id: number;
  no_persons: number;
  event_name: string | null;
  equipement_loaned: boolean;
  equipement_returned: boolean;
  event_date: string;
  total_price: string;
  status: OrderStatus;
  changed_at: string;
  changed_by: number;
  menu_id: number | string;
  unit_price_snapshot: string;
  theme: string | null;
};

export type UserOrderDTO = {
  resId: number;
  noPersons: number;
  eventName: string | null;
  equipmentLoaned: boolean;
  equipmentReturned: boolean;
  eventDate: string;
  totalPrice: number;
  menuId: number;
  unitPriceSnapshot: number;
  theme: string | null;
  history: OrderHistoryItemDTO[];
};

export type UserOrdersResponseDTO = {
  orders: UserOrderDTO[];
};
