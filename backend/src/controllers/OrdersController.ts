import { request, Request, Response } from "express";
import { OrdersService } from "../services/OrdersService.js";
import { ApiError, UserRequest } from "../types/users.js";
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

  saveNewOrders = async (req: UserRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userId = req.user.user_id;
      const data: CreateOrderDTO = req.body;

      const response = await this.orderService.saveOrder(userId, data);
      console.log("Reservation created:", response);

      console.log("RES ID:", response?.reservationId);

      return res.status(201).json(response);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Operation failed" });
    }
  };
}
