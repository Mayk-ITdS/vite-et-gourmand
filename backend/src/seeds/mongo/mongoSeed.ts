import { connectMongo, connectPostgres, pgPool } from "../../config/db.js";
import seedReviews from "../pipeline/seedAvis.js";
import seedMongoAnalytics from "../pipeline/seedMongoAnalytics.js";

const mongoSeed = async () => {
  await connectPostgres();
  await connectMongo();
  const client = await pgPool.connect();

  try {
    await seedMongoAnalytics(client);
    await seedReviews();
    console.log("Mongo seed completed");
  } catch (e) {
    console.error("Mongo seed failed", e);
  } finally {
    client.release();
    process.exit(0);
  }
};
mongoSeed();
