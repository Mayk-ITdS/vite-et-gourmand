import { CreateOrderDTO } from "../dtos/orders.dtos.js";
import { OrderRepository } from "../repositories/orders.repository.js";

import { calculatePricing } from "./pricing.service.js";
import AdminAnalyticsService from "./AdminAnalyticsService.js";
import { ApiError } from "../types/errors.js";

export class OrdersService {
  constructor(
    private orderRepo = new OrderRepository(),
    private analytics = AdminAnalyticsService,
  ) {}

  getAllOrders = async (id: number) => {
    try {
      return await this.orderRepo.findByUser(Number(id));
    } catch (err) {
      throw new ApiError(404, String(err), false);
    }
  };

  getFullOrdersData = async () => {
    try {
      return await this.orderRepo.fullOrdersScan();
    } catch (err) {
      throw new ApiError(404, String(err), false);
    }
  };

  deleteOneOrder = async (orderId: number) => {
    try {
      const response = await this.orderRepo.deleteOrderById(orderId);

      return response;
    } catch (e) {
      throw new ApiError(404, "Id doesn`t exist", false);
    }
  };

  cancelOrder = async (id: number, userId: number) => {
    try {
      const result = await this.orderRepo.cancelUserOrderById(id, userId);
      return result;
    } catch (e) {
      throw new ApiError(404, String(e), false);
    }
  };

  updateStatusByAdmin = async (
    orderId: number,
    nextStatus: string | undefined,
    adminUserId: number,
  ) => {
    const allowed = ["pending", "confirmed", "completed", "cancelled"] as const;
    if (!nextStatus || !(allowed as readonly string[]).includes(nextStatus)) {
      throw new ApiError(400, "Invalid status value", false);
    }
    const updated = await this.orderRepo.updateStatusByAdmin(
      orderId,
      nextStatus as (typeof allowed)[number],
      adminUserId,
    );
    if (!updated) {
      throw new ApiError(404, "Order not found", false);
    }
    return updated;
  };

  confirmOrderByEmployee = async (orderId: number, employeeUserId: number) => {
    const updated = await this.orderRepo.updateStatusByAdmin(
      orderId,
      "confirmed",
      employeeUserId,
    );
    if (!updated) {
      throw new ApiError(404, "Order not found", false);
    }
    return updated;
  };

  async createReservation(userId: number, dto: CreateOrderDTO) {
    if (!dto.menus?.length) {
      throw new ApiError(400, "Order must contain at least one menu", true);
    }
    if (!dto?.prestation?.date || !dto?.prestation?.city) {
      throw new ApiError(400, "Missing prestation data", true);
    }
    const menusFromDb = await this.orderRepo.findMenusByIds(
      dto.menus.map((m) => m.menuId),
    );
    const pricing = calculatePricing(dto.menus, menusFromDb);

    const prestation = {
      city: dto.prestation.city,
      streetName: dto.prestation.streetName,
      streetNumber: dto.prestation.streetNumber,
      zipCode: dto.prestation.zipCode,
      date: dto.prestation.date,
      time: dto.prestation.time,
      distanceKm: dto.prestation.distanceKm,
    };

    const result = await this.orderRepo.createReservationTransaction(
      userId,
      prestation,
      dto.menus,
      pricing,
    );
    for (const menu of pricing.menus) {
      await this.analytics.registerOrder({
        menuId: Number(menu.menuId),
        totalPrice: menu.final,
        status: "pending",
        date: new Date(dto.prestation.date),
      });
    }

    return result;
  }
}
