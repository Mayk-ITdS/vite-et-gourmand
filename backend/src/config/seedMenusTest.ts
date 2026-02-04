import { pgPool } from "./db.js";

const menus = [
  [
    "Menu Classique",
    "Cuisine française traditionnelle",
    39.99,
    "Classique",
    "Classique",
    2,
    50,
    "01:30",
  ],
  [
    "Vegan Green",
    "Menu 100% végétal pour événements",
    44.99,
    "Evenement",
    "Vegan",
    5,
    40,
    "01:45",
  ],
  [
    "Noël Prestige",
    "Menu gastronomique de fête",
    69.99,
    "Noel",
    "Classique",
    10,
    20,
    "02:30",
  ],
  [
    "Romantic",
    "Dîner romantique pour deux",
    49.99,
    "Soiree romantique",
    "Vegetarien",
    2,
    15,
    "01:15",
  ],
  [
    "Business",
    "Menu événement professionnel",
    59.99,
    "Evenement",
    "Classique",
    20,
    30,
    "02:00",
  ],
  [
    "Light Vegan",
    "Menu léger et équilibré",
    34.99,
    "Classique",
    "Vegan",
    4,
    60,
    "01:00",
  ],
];

const sql =
  "INSERT INTO menus(menu_name,description,prix_unitaire,menu_theme,diet_type,min_persons,quantity_in_stock,min_preparation_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
const run = async () => {
  for (let x of menus) {
    const values = Array.from(x);
    await pgPool.query(sql, values);
  }
  console.log("✅ Menus seeded");
  await pgPool.end();
};
run().catch((err) => {
  console.error("❌ Seed failed", err);
  process.exit(1);
});
