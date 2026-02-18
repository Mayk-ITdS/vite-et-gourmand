import { pgPool } from "../../config/db.js";
import { menuItems } from "../data/neitems.js";
import { finalMenus } from "../data/neitems.js";
import { seedItemsDB } from "./seedMenuItems.js";
import { seedMenus } from "./seedMenus.js";
import { linkRelations } from "./seedRelationsMenus.js";

async function main() {
  const client = await pgPool.connect();

  try {
    await client.query("BEGIN");

    const itemMap = await seedItemsDB(menuItems);
    const { menuMap } = await seedMenus(finalMenus);

    await linkRelations(finalMenus, itemMap, menuMap);

    await client.query("COMMIT");
    console.log("Seed complete");
  } catch (e) {
    await client.query("ROLLBACK");
    console.error(e);
  } finally {
    client.release();
    await pgPool.end();
  }
}
main();
