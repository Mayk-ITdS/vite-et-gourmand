import { getDBMongo } from "../../config/db.js";
import { opinions } from "../data/opinions.js";

const seedReviews = async () => {
  const db = getDBMongo();
  await db.collection("reviews").deleteMany({});
  const result = getDBMongo()
    .collection("reviews")
    .insertMany(
      opinions.map((o) => ({
        order_id: o.order_id,
        pseudo: o.pseudo,
        avatar: o.avatar,
        content: o.content,
        score: o.score,
        createdAt: new Date(o.createdAt.$date),
      })),
    );
  return (await result).insertedCount;
};
export default seedReviews;
