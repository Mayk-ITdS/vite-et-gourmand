import type { AdminResource, AdminRow } from "../adminCrud.types";

const getId = (row: AdminRow, key: string): string => {
  const value = row[key];
  return value === null || value === undefined ? "" : String(value);
};

/**
 * Pending reviews moderation for the employee space.
 * Read-only table (no create/edit/delete) with two workflow actions:
 *  - Approve  -> PATCH /reviews/:id/approve
 *  - Reject   -> PATCH /reviews/:id/reject  (with a standards-violation reason)
 */
export const reviewsModerationResource = {
  key: "employee-reviews",
  idKey: "_id",
  label: "Avis à modérer",
  endpoint: "/reviews/pending",

  permissions: {
    canCreate: false,
    canEdit: false,
    canDelete: false,
  },

  columns: [
    { key: "pseudo", label: "Pseudo" },
    { key: "content", label: "Commentaire" },
    { key: "score", label: "Note", type: "number" },
    { key: "createdAt", label: "Créé le", type: "date" },
  ],

  fields: [],

  rowActions: [
    {
      key: "approve",
      label: "Valider",
      variant: "success",
      method: "patch",
      buildPath: (row) => `/reviews/${getId(row, "_id")}/approve`,
      confirm: {
        title: "Valider cet avis ?",
        description: "L'avis sera publié et visible publiquement.",
        confirmLabel: "Valider",
      },
    },
    {
      key: "reject",
      label: "Rejeter",
      variant: "danger",
      method: "patch",
      buildPath: (row) => `/reviews/${getId(row, "_id")}/reject`,
      promptReason: {
        title: "Rejeter cet avis",
        description:
          "Indiquez le motif du rejet. Le client en sera informé dans son espace.",
        label: "Motif du rejet",
        defaultValue: "Non-respect des standards de publication",
        confirmLabel: "Rejeter l'avis",
      },
    },
  ],
} satisfies AdminResource;

/**
 * Reservations list for the employee space.
 * Read-only table with a single workflow action: confirm a reservation.
 *  - Confirmer -> PATCH /employee/orders/:id/status  (status forced to "confirmed")
 */
export const ordersConfirmResource = {
  key: "employee-orders",
  idKey: "res_id",
  label: "Réservations à confirmer",
  endpoint: "/employee/orders",

  permissions: {
    canCreate: false,
    canEdit: false,
    canDelete: false,
  },

  columns: [
    { key: "res_id", label: "ID" },
    { key: "user_email", label: "Client", type: "text" },
    { key: "event_name", label: "Événement" },
    { key: "event_date", label: "Date", type: "date" },
    { key: "no_persons", label: "Personnes", type: "number" },
    { key: "total_price", label: "Total", type: "currency" },
    { key: "status", label: "Statut" },
  ],

  fields: [],

  rowActions: [
    {
      key: "confirm",
      label: "Confirmer",
      variant: "success",
      method: "patch",
      buildPath: (row) => `/employee/orders/${getId(row, "res_id")}/status`,
      body: { status: "confirmed" },
      confirm: {
        title: "Confirmer cette réservation ?",
        description: "Le statut de la réservation passera à « confirmée ».",
        confirmLabel: "Confirmer",
      },
    },
  ],
} satisfies AdminResource;
