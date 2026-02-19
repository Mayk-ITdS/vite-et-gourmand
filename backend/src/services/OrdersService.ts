import { CreateOrderDTO, CreateReservationDTO } from "../dtos/orders.dtos.js";
import { OrderRepository } from "../repositories/orders.repository.js";
import { ApiError } from "../types/users.js";
import { calculatePricing } from "./pricing.service.js";
import { MenuFromDB } from "../types/menus/pricing.types.js";
import AdminAnalyticsService from "./adminAnalytics.js";

export class OrdersService {
  constructor(
    private orderRepo = new OrderRepository(),
    private analytics = new AdminAnalyticsService(),
  ) {}
  getAllOrders = async (id: number) => {
    try {
      return await this.orderRepo.findByUser(id);
    } catch (err) {
      throw new ApiError(404, "Invalid credential", false);
    }
  };

  saveOrder = async (userId: number, data: CreateOrderDTO) => {
    try {
      const { menus, prestation } = data;
      console.log("Menus: ", menus, "Prestations", prestation);
      if (!menus.length) throw new ApiError(400, "No moenus provided");
      const menusFromDB: MenuFromDB[] = await this.orderRepo.findMenusByIds(
        menus.map((m) => Number(m.menuId)),
      );
      if (menusFromDB.length !== menus.length) {
        throw new ApiError(404, "One or more menus not found", true);
      }

      for (const menu of menus) {
        const dbMenu = menusFromDB.find(
          (m) => Number(m.menu_id) === Number(menu.menuId),
        );
        console.log(menu);
        console.log(menus);
        if (!dbMenu) throw new ApiError(404, "Menu not found", true);
      }
      const pricing = calculatePricing(data.menus, menusFromDB);
      return await this.orderRepo.createReservationTransaction(
        userId,
        prestation,
        menus,
        pricing,
      );
    } catch (err) {
      console.error("SAVE ORDER ERROR:", err);
      throw new ApiError(401, String(err), false);
    }
  };
  async createReservation(userId: number, dto: CreateReservationDTO) {
    const menusFromDb = await this.orderRepo.findMenusByIds(
      dto.menus.map((m) => m.menuId),
    );
    const pricing = calculatePricing(dto.menus, menusFromDb);

    const prestation = {
      address: dto.eventAddress,
      date: dto.eventDate,
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
      console.log("SAVING ANALYTICS FOR:", menu.menuId);
      console.log("➡️ ENTER LOOP");
      console.log("SAVING ANALYTICS FOR:", menu.menuId);
      await this.analytics.registerOrder({
        menuId: Number(menu.menuId),
        totalPrice: menu.final,
        status: "pending",
        date: new Date(dto.eventDate),
      });
    }

    return result;
  }
}
