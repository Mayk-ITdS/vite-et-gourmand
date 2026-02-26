import { PoolClient } from "pg";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function seedReservationMenus(client: PoolClient) {
  console.log("Seeding reservation_menus...");

  let inserted = 0;
  const reservations = await client.query(
    `SELECT res_id FROM reservations ORDER BY res_id`,
  );

  const menus = await client.query(`SELECT menu_id, prix_unitaire FROM menus`);

  for (const reservation of reservations.rows) {
    const numberOfMenus = randomInt(1, 3);
    inserted++;
    let totalPrice = 0;

    const shuffledMenus = [...menus.rows].sort(() => 0.5 - Math.random());

    for (let i = 0; i < numberOfMenus; i++) {
      const menu = shuffledMenus[i];
      const quantity = randomInt(10, 80);

      const subtotal = Number(menu.prix_unitaire) * quantity;
      totalPrice += subtotal;

      const insertReserv = await client.query(
        `
        INSERT INTO reservation_menus
        (res_id, menu_id, unit_price_snapshot, quantity, notes)
        VALUES ($1,$2,$3,$4,$5)
        `,
        [reservation.res_id, menu.menu_id, menu.prix_unitaire, quantity, null],
      );
      inserted += insertReserv.rowCount ?? 0;
    }

    await client.query(
      `
      UPDATE reservations
      SET total_price = $1
      WHERE res_id = $2
      `,
      [totalPrice, reservation.res_id],
    );
  }

  return inserted;
}
