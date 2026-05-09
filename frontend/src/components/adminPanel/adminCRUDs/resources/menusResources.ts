import type { AdminResource } from "../adminCrud.types";

const dietOptions = [
  { label: "Végétarien", value: "Vegetarien" },
  { label: "Vegan", value: "Vegan" },
  { label: "Classique", value: "Classique" },
];

const themeOptions = [
  { label: "Tradition Française", value: "Tradition Française" },
  { label: "Haute Sélection", value: "Haute Sélection" },
  { label: "Garden Party", value: "Garden Party" },
  { label: "Vernissage", value: "Vernissage" },
  { label: "Dîner Privé", value: "Dîner Privé" },
  { label: "Anniversaire Élégant", value: "Anniversaire Élégant" },
  { label: "Événement Entreprise", value: "Événement Entreprise" },
  { label: "Soirée Romantique", value: "Soirée Romantique" },
];

export const menusResource: AdminResource = {
  key: "menus",
  idKey: "menu_id",
  label: "Menus",
  endpoint: "/admin/menus",

  columns: [
    { key: "menu_id", label: "ID" },
    { key: "image_url", label: "Image", type: "image" },
    { key: "menu_name", label: "Nom du menu" },
    { key: "themes", label: "Thème" },
    { key: "diet_type", label: "Régime" },
    { key: "prix_unitaire", label: "Prix", type: "currency" },
    { key: "min_persons", label: "Min. pers.", type: "number" },
    { key: "quantity_in_stock", label: "Stock", type: "number" },
  ],

  fields: [
    {
      name: "menu_code",
      label: "Code du menu",
      type: "text",
      placeholder: "MNU-0004",
    },
    {
      name: "menu_name",
      label: "Nom du menu",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
    {
      name: "diet_type",
      label: "Type de régime",
      type: "select",
      required: true,
      options: dietOptions,
    },
    {
      name: "themes",
      label: "Thèmes",
      type: "multiselect",
      options: themeOptions,
      required: true,
    },
    {
      name: "prix_unitaire",
      label: "Prix",
      type: "number",
      required: true,
    },
    {
      name: "image_url",
      label: "Image du menu",
      type: "image",
      mode: "url",
    },
    {
      name: "is_active",
      label: "Actif",
      type: "boolean",
    },
  ],
};
