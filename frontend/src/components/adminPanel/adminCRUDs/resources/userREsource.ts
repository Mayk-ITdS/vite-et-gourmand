export const usersResource = {
  key: "users",
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
};
