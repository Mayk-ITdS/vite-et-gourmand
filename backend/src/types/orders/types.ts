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
export type ReservationStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type UserOrderRow = {
  res_id: number;
  no_persons: number;
  event_name: string | null;
  equipement_loaned: boolean;
  equipement_returned: boolean;
  event_date: string;
  total_price: string;
  status: ReservationStatus;
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
  history: {
    status: ReservationStatus;
    changedAt: string | null;
    changedBy: number | null;
  };
};

export type UserOrdersResponseDTO = {
  orders: UserOrderDTO[];
};
