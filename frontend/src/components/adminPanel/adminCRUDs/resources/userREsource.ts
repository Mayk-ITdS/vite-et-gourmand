import type { AdminResource } from "../adminCrud.types";

export const usersResource = {
  key: "users",
  idKey: "user_id",
  label: "Utilisateurs",
  endpoint: "/admin/users",

  columns: [
    { key: "user_id", label: "ID" },
    { key: "user_first_name", label: "Prénom" },
    { key: "user_last_name", label: "Nom" },
    { key: "user_email", label: "Email" },
    { key: "city", label: "Ville" },
    { key: "is_active", label: "Statut", type: "boolean" },
  ],

  fields: [
    { name: "user_first_name", label: "Prénom", type: "text", required: true },
    { name: "user_last_name", label: "Nom", type: "text", required: true },
    { name: "user_email", label: "Email", type: "email", required: true },
    { name: "mobile_number", label: "Téléphone", type: "text" },
    { name: "city", label: "Ville", type: "text" },
    { name: "street", label: "Rue", type: "text" },
    { name: "house_number", label: "Numéro", type: "number" },
    { name: "zip_code", label: "Code postal", type: "text" },
    { name: "country", label: "Pays", type: "text" },
    { name: "is_active", label: "Actif", type: "boolean" },
  ],
} satisfies AdminResource;

export const ordersResource = {
  key: "orders",
  idKey: "res_id",
  label: "Réservations",
  endpoint: "/admin/orders",

  columns: [
    { key: "res_id", label: "ID" },
    { key: "user_email", label: "Client", type: "text" },
    { key: "event_name", label: "Événement" },
    { key: "event_date", label: "Date", type: "date" },
    { key: "no_persons", label: "Personnes", type: "number" },
    { key: "total_price", label: "Total", type: "currency" },
    { key: "status", label: "Statut" },
  ],

  fields: [
    {
      name: "status",
      label: "Statut de la réservation",
      type: "select",
      required: true,
      options: [
        { label: "En attente", value: "pending" },
        { label: "Confirmée", value: "confirmed" },
        { label: "Annulée", value: "cancelled" },
        { label: "Terminée", value: "completed" },
      ],
    },
    {
      name: "event_name",
      label: "Nom de l'événement",
      type: "text",
    },
    {
      name: "event_date",
      label: "Date de l'événement",
      type: "date",
    },
    {
      name: "no_persons",
      label: "Nombre de personnes",
      type: "number",
    },
    {
      name: "client_preferences",
      label: "Préférences client",
      type: "textarea",
    },
    {
      name: "equipement_loaned",
      label: "Matériel prêté",
      type: "boolean",
    },
    {
      name: "equipement_returned",
      label: "Matériel retourné",
      type: "boolean",
    },
  ],
} satisfies AdminResource;
