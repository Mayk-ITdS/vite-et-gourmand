import { CreateOrderDTO, CreateReservationDTO } from "../dtos/orders.dtos.js";
import { OrderRepository } from "../repositories/orders.repository.js";
import { ApiError } from "../types/users.js";
import { calculatePricing } from "./pricing.service.js";
import { MenuFromDB } from "../types/menus/pricing.types.js";
import AdminAnalyticsService from "./AdminAnalyticsService.js";

export class OrdersService {
  constructor(
    private orderRepo = new OrderRepository(),
    private analytics = AdminAnalyticsService
  ) {}
  getAllOrders = async (id: number) => {
    try {
      return await this.orderRepo.findByUser(id);
    } catch (err) {
      throw new ApiError(404, "Invalid credential", false);
    }
  };

  async createReservation(userId: number, dto: CreateOrderDTO) {
    const menusFromDb = await this.orderRepo.findMenusByIds(dto.menus.map((m) => m.menuId));
    const pricing = calculatePricing(dto.menus, menusFromDb);

    const prestation = {
      address: dto.prestation.address,
      city: dto.prestation.city,
      date: dto.prestation.date,
      time: dto.prestation.time,
    };

    const result = await this.orderRepo.createReservationTransaction(
      userId,
      prestation,
      dto.menus,
      pricing
    );
    console.log("PRICING MENUS:", pricing.menus);
    console.log("ANALYTICS INSTANCE:", this.analytics);

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
