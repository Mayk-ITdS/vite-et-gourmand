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

  prestation: {
    address: string;
    city: string;
    date: string;
    time: string;
    distanceKm: number;
  };
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
