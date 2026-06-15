import { NextFunction, Response } from "express";
import { OrdersService } from "../services/OrdersService.js";
import { ApiError, User, UserRequest } from "../types/users.js";
import { CreateOrderDTO } from "../dtos/orders.dtos.js";

export class OrdersController {
  constructor(private orderService = new OrdersService()) {}
  getMyOrders = async (req: UserRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user.user_id;
    const data = await this.orderService.getAllOrders(userId);

    return res.status(200).json({ data });
  };

  saveNewOrders = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userId = req.user.user_id;
      const data: CreateOrderDTO = req.body;
      const response = await this.orderService.createReservation(userId, data);

      return res.status(201).json(response);
    } catch (err) {
      next(err);
      return res.status(500).json({ message: "Operation failed" });
    }
  };
  cancelOrderById = async (req: UserRequest, res: Response) => {
    if (!req.user) return res.status(404).json({ message: "Üser not found" });
    try {
      const orderId = req.params.id;
      console.log(orderId);
      const response = await this.orderService.cancelOrder(
        Number(orderId),
        req.user.user_id,
      );

      res.status(204).json(response);
    } catch (e) {
      throw new ApiError(500, String(e), false);
    }
  };
}
