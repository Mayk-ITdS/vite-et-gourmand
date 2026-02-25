import { Request, Response } from "express";
import { LoginDTO } from "../dtos/auth.dto.js";
import { AuthService } from "../services/AuthService.js";
import AdminAnalyticsService from "../services/adminAnalytics.js";
import { OrdersService } from "../services/OrdersService.js";
import { UserRequest } from "../types/users.js";

class AdminController {
  constructor(
    private adminService = new AuthService(),
    private orderService = new OrdersService(),
    private analyticsService = new AdminAnalyticsService(),
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
      const userId = Number(req.user?.user_id);
      const result = await this.orderService.createReservation(
        userId,
        req.body,
      );

      return res.status(201).json(result);
    } catch (err) {
      return res.status(400).json({ message: "Reservation failed" });
    }
  };
}

export default new AdminController();
