import { PoolClient } from "pg";
import bcrypt from "bcrypt";

export const seedUsers = async (client: PoolClient): Promise<number> => {
  console.log("Seeding users with full data...");
  let inserted = 0;
  try {
    const roleRes = await client.query(
      `SELECT role_id FROM roles WHERE role_name = 'user' LIMIT 1`,
    );

    if (!roleRes.rowCount) {
      throw new Error("Role 'user' not found. Seed roles first.");
    }

    const roleId = roleRes.rows[0].role_id;

    const usersData = [
      {
        first: "Jean",
        last: "Martin",
        email: "jean.martin@demo.fr",
        phone: "0612457890",
        city: "Paris",
        street: "Rue de Rivoli",
        house: 12,
        zip: "75001",
        country: "France",
      },
      {
        first: "Claire",
        last: "Dubois",
        email: "claire.dubois@demo.fr",
        phone: "0623147852",
        city: "Lyon",
        street: "Rue Mercière",
        house: 8,
        zip: "69002",
        country: "France",
      },
      {
        first: "Lucas",
        last: "Bernard",
        email: "lucas.bernard@demo.fr",
        phone: "0635874123",
        city: "Bordeaux",
        street: "Cours Victor Hugo",
        house: 25,
        zip: "33000",
        country: "France",
      },
      {
        first: "Emma",
        last: "Robert",
        email: "emma.robert@demo.fr",
        phone: "0645879632",
        city: "Marseille",
        street: "Rue Paradis",
        house: 17,
        zip: "13006",
        country: "France",
      },
      {
        first: "Hugo",
        last: "Petit",
        email: "hugo.petit@demo.fr",
        phone: "0654789632",
        city: "Toulouse",
        street: "Allée Jean Jaurès",
        house: 3,
        zip: "31000",
        country: "France",
      },
      {
        first: "Chloé",
        last: "Durand",
        email: "chloe.durand@demo.fr",
        phone: "0662147859",
        city: "Nice",
        street: "Rue Masséna",
        house: 22,
        zip: "06000",
        country: "France",
      },
      {
        first: "Louis",
        last: "Moreau",
        email: "louis.moreau@demo.fr",
        phone: "0674589631",
        city: "Nantes",
        street: "Rue Crébillon",
        house: 5,
        zip: "44000",
        country: "France",
      },
      {
        first: "Camille",
        last: "Fournier",
        email: "camille.fournier@demo.fr",
        phone: "0687452136",
        city: "Strasbourg",
        street: "Rue des Grandes Arcades",
        house: 14,
        zip: "67000",
        country: "France",
      },
      {
        first: "Nathan",
        last: "Girard",
        email: "nathan.girard@demo.fr",
        phone: "0698745123",
        city: "Lille",
        street: "Rue Nationale",
        house: 19,
        zip: "59000",
        country: "France",
      },
      {
        first: "Léa",
        last: "Andre",
        email: "lea.andre@demo.fr",
        phone: "0614785236",
        city: "Paris",
        street: "Boulevard Saint-Germain",
        house: 44,
        zip: "75005",
        country: "France",
      },
    ];

    for (const u of usersData) {
      const hash = await bcrypt.hash("demo123", 10);
      inserted++;
      const userRes = await client.query(
        `
        INSERT INTO users (
          user_first_name,
          user_last_name,
          user_email,
          password_hash,
          mobile_number,
          city,
          street,
          house_number,
          zip_code,
          country
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING user_id
        `,
        [
          u.first,
          u.last,
          u.email,
          hash,
          u.phone,
          u.city,
          u.street,
          u.house,
          u.zip,
          u.country,
        ],
      );

      const userId = userRes.rows[0].user_id;

      await client.query(
        `INSERT INTO user_roles (user_id, role_id) VALUES ($1,$2)`,
        [userId, roleId],
      );
    }
    return inserted ?? 0;
  } catch (err) {
    throw err;
  }
};
