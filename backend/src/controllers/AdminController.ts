import { Request, Response } from "express";
import { LoginDTO } from "../dtos/auth.dto.js";
import { AuthService } from "../services/AuthService.js";
import AdminAnalyticsService from "../services/AdminAnalyticsService.js";
import { OrdersService } from "../services/OrdersService.js";
import { ApiError, UserRequest } from "../types/users.js";
import { privateEncrypt } from "node:crypto";

class AdminController {
  constructor(
    private adminService = new AuthService(),
    private orderService = new OrdersService(),
    private analyticsService = AdminAnalyticsService
  ) {}

  login = async (req: Request<{}, {}, LoginDTO>, res: Response) => {
    try {
      const auth = await this.adminService.login(req.body);
      return res.status(200).json(auth);
    } catch (err) {
      return res.status(403).json({ message: "Unauthorized" });
    }
  };

  getDashboard = async (_req: Request, res: Response) => {
    const data = await this.analyticsService.getFullDashboard();
    return res.json(data);
  };

  createReservation = async (req: UserRequest, res: Response) => {
    try {
      const data = req.body;
      const userId = Number(req.user?.user_id);
      const result = await this.orderService.createReservation(userId, req.body);

      return res.status(201).json(result);
    } catch (err) {
      return res.status(400).json({ message: "Reservation failed" });
    }
  };
  stockIngestion = async (req: UserRequest, res: Response) => {
    try {
      const { mode, payload } = req.body;
      const result = await this.analyticsService.ingestDelivery(mode, payload);
      console.log(result);
      return res.status(200).json({ message: "You`ve done it !!!", payload: result });
    } catch (err: any) {
      console.error("REAL ERROR IN STOCK INGESTION:");
      console.error("message:", err?.message);
      console.error("code:", err?.code);
      console.error("detail:", err?.detail);
      console.error("where:", err?.where);
      console.error("stack:", err?.stack);
      throw new ApiError(400, String(err), false);
    }
  };
}

export default new AdminController();
