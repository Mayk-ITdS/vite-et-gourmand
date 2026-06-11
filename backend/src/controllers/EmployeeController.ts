import { NextFunction, Response } from "express";

import { OrdersService } from "../services/OrdersService.js";
import { ApiError, UserRequest } from "../types/users.js";

class EmployeeController {
  constructor(private orderService = new OrdersService()) {}

  getOrders = async (_req: UserRequest, res: Response, next: NextFunction) => {
    try {
      const data = await this.orderService.getFullOrdersData();
      return res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  };

  confirmOrder = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new ApiError(401, "Unauthorized", false);
      }
      const orderId = Number(req.params.id);
      if (!Number.isInteger(orderId)) {
        throw new ApiError(400, "Identifiant de réservation invalide", false);
      }
      const result = await this.orderService.confirmOrderByEmployee(
        orderId,
        Number(req.user.user_id),
      );
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}

export default new EmployeeController();
