import { PoolClient } from "pg";
import { connectMongo, getDBMongo } from "../../config/db.js";
import AdminAnalyticsService from "../../services/AdminAnalyticsService.js";

const seedMongoAnalytics = async (client: PoolClient) => {
  console.log("Ï`m in mongo analitics");
  const adminAnal = new AdminAnalyticsService();
  await connectMongo();
  const db = getDBMongo();
  let inserted = 0;
  await db.collection("menustats").deleteMany({});
  await db.collection("monthlystats").deleteMany({});
  await db.collection("statusstats").deleteMany({});

  const sql = `Select r.res_status,
                    r.event_date,
                    json_agg(
                    json_build_object(
                        'menu_id',rm.menu_id,
                        'quantity',rm.quantity,
                        'price_snap',rm.unit_price_snapshot
                        )
                    ) AS menus
                    FROM reservations r inner join reservation_menus rm 
                    ON r.res_id = rm.res_id 
                    WHERE res_status = 'completed'
                    GROUP BY r.res_id, r.res_status, r.event_date`;

  const reservations = await client.query(sql);
  console.log("Ï`m in mongo analitics just before la boucle");
  for (const res of reservations.rows) {
    inserted++;
    const { res_status, event_date, menus } = res;
    for (const menu of menus) {
      let total = menu.price_snap * menu.quantity;
      await adminAnal.registerOrder({
        menuId: menu.menu_id,
        totalPrice: total,
        status: res_status,
        date: new Date(event_date),
      });
    }
  }
  console.log("Ï`m in mongo analitics je reviens cetais chouette!");
  return inserted;
};
export default seedMongoAnalytics;
