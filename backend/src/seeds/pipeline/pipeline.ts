import { closeMongo, pgPool } from "../../config/db.js";
import { menuItems } from "../data/neitems.js";
import { finalMenus } from "../data/neitems.js";
import { seedUsers } from "./seedUsers.js";
import { seedMenuItems } from "./seedMenuItems.js";
import { seedMenus } from "./seedMenus.js";
import { linkRelations } from "./seedRelationsMenus.js";
import seedMongoAnalytics from "./seedMongoAnalytics.js";
import seedReviews from "./seedAvis.js";
import { seedReservationMenus } from "./seedReservationMenus.js";
import { seedReservations } from "./seedTest.js";
import { ApiError } from "../../types/users.js";

async function main() {
  const client = await pgPool.connect();
  let usersInserted = 0;
  let menusInserted = 0;
  let reservationsInserted = 0;
  let reservationMenusInserted = 0;
  let mongoAnalyticsInserted = 0;
  let reviewsInserted = 0;
  try {
    const alreadySeeded = await client.query(`SELECT 1 FROM reservations LIMIT 1`);

    if (alreadySeeded.rowCount) {
      console.log("Seed skipped: reservations already exist.\n");
      return;
    }

    console.log("\n Starting seed transaction...\n");

    await client.query("BEGIN");

    usersInserted = await seedUsers(client);
    const menusRes = await seedMenus(client, finalMenus);
    menusInserted = menusRes.inserted;
    const itemsInserted = await seedMenuItems(client, menuItems);

    await linkRelations(client, finalMenus, itemsInserted.itemMap, menusRes.menuMap);

    reservationsInserted = await seedReservations(client);
    reservationMenusInserted = await seedReservationMenus(client);

    await client.query("COMMIT");
    console.log("PostgreSQL seed committed successfully.\n");
    try {
      console.log("Building Mongo analytics...\n");
      mongoAnalyticsInserted = await seedMongoAnalytics(client);
      reviewsInserted = await seedReviews();
      console.log("Mongo analytics seeded.\n");
    } catch (mongoErr) {
      console.error("Mongo analytics failed (Postgres already committed).");
      console.error(mongoErr);
    }
  } catch (err) {
    console.error("Seed failed. Rolling back...\n");
    await client.query("ROLLBACK");
    throw new ApiError(500, String(err));
  } finally {
    client.release();
    await pgPool.end();
    await closeMongo();
  }

  console.log("Users inserted:", usersInserted);
  console.log("Menus inserted:", menusInserted);
  console.log("Reservations inserted:", reservationsInserted);
  console.log("ReservationMenus inserted:", reservationMenusInserted);
  console.log("Mongo Analytics events:", mongoAnalyticsInserted);
  console.log("Reviews inserted:", reviewsInserted);
  console.log("Seed process completed.\n");

  process.exit(0);
}

main();
