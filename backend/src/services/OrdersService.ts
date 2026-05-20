import { CreateOrderDTO, CreateReservationDTO } from "../dtos/orders.dtos.js";
import { OrderRepository } from "../repositories/orders.repository.js";
import { ApiError, User } from "../types/users.js";
import { calculatePricing } from "./pricing.service.js";
import AdminAnalyticsService from "./AdminAnalyticsService.js";

export class OrdersService {
  constructor(
    private orderRepo = new OrderRepository(),
    private analytics = AdminAnalyticsService,
  ) {}
  getAllOrders = async (id: number) => {
    try {
      console.log("It`s typeof id:", typeof id, "id:", id);
      return await this.orderRepo.findByUser(Number(id));
    } catch (err) {
      throw new ApiError(404, String(err), false);
    }
  };

  async createReservation(userId: number, dto: CreateOrderDTO) {
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
