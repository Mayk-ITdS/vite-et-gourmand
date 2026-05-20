import type { ClientError } from "@/types/errors";

export const suiviStatusValues = [
  "accepte",
  "en préparation",
  "en cours de livraison",
  "livré",
  "en attente du retour de matériel",
  "terminée",
] as const;
export type SuiviStatusValue = (typeof suiviStatusValues)[number];

export interface Prestation {
  city: string;
  streetName: string;
  streetNumber: number;
  zipCode: string;
  date: string;
  time: string;
  distanceKm: number;
}

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
type OrderDraft = {
  order: {
    menu_id: number[] | number;
    menu_name: string[] | string;
    unitPrice: number;
    minPersons: number;
    persons: number;
    suivi: {
      status: SuiviStatusValue[];
    };
  };
  client: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

  prestation: Prestation;
  pricing: {
    base: number;
    discount: number;
    delivery: number;
    ht: number;
    tva: number;
    ttc: number;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: ClientError | null;
  step: number;
};
export { type OrderDraft };
