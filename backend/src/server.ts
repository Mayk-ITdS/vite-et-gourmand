import express from "express";
import { connectMongo, connectPostgres } from "./config/db.js";
import menuRoutes from "./routes/menuRoutes.js";
import { ENV } from "./config/env.js";
import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import globalErrorHandler from "./middlewares/error.middleware.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/menus", menuRoutes);
app.use("/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders/", orderRoutes);
app.use(globalErrorHandler);

const startover = async () => {
  try {
    await connectPostgres();
    await connectMongo();

    app.listen(ENV.SERVER.PORT, "0.0.0.0", () => {
      console.log(`Server listening on ${ENV.SERVER.PORT}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
startover();
