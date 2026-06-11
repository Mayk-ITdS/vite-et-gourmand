import { NextFunction, Request, Response } from "express";
import { LoginDTO } from "../dtos/auth.dto.js";
import { AuthService } from "../services/AuthService.js";
import AdminAnalyticsService from "../services/AdminAnalyticsService.js";
import { OrdersService } from "../services/OrdersService.js";
import { ApiError, UserRequest } from "../types/users.js";
import { MenuService } from "../services/MenuService.js";
import { UserPatchRequest } from "../types/requests/menu.patch.js";
import { IdParams, MenuCreateRequest, MenuDeleteRequest } from "../types/menus/menus.js";
import { UserService } from "../services/UserService.js";

class AdminController {
  constructor(
    private adminService = new AuthService(),
    private orderService = new OrdersService(),
    private analyticsService = AdminAnalyticsService,
    private menuService = new MenuService(),
    private usersService = new UserService(),
  ) {}

  login = async (req: Request<{}, {}, LoginDTO>, res: Response) => {
    try {
      const auth = await this.adminService.login(req.body);
      return res.status(200).json(auth);
    } catch (err) {
      return res.status(403).json({ message: "Unauthorized" });
    }
  };
  getAdminOrders = async (req: UserRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user.user_id;
    const data = await this.orderService.getFullOrdersData();

    return res.status(200).json({ data });
  };
  deleteMenu = async (req: MenuDeleteRequest, res: Response, next: NextFunction) => {
    try {
      const menuId = req.params.id;
      const result = await this.menuService.deleteOneMenu(Number(menuId));
      res.status(200).json(result);
    } catch (error: any) {
      next(error);
    }
  };
  getDashboard = async (_req: Request, res: Response) => {
    const data = await this.analyticsService.getFullDashboard();
    return res.json(data);
  };
  getUsers = async (req: UserRequest, res: Response) => {
    try {
      const data = await this.usersService.getAllUsers();
      console.log(data);
      return res.status(200).json(data);
    } catch (err) {
      throw new ApiError(500, String(err), false);
    }
  };
  getMenus = async (req: UserRequest, res: Response) => {
    try {
      const data = await this.menuService.getAllMenus();
      console.log(data);
      return res.status(200).json(data);
    } catch (err) {
      throw new ApiError(500, "Get menus function error", false);
    }
  };
  createMenu = async (req: MenuCreateRequest, res: Response, next: NextFunction) => {
    try {
    } catch (err) {}
  };
  patchMenu = async (req: UserPatchRequest, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const payload = req.body;
      const data = await this.menuService.patchOneMenu(id, payload);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
  deleteOrder = async (req: Request<IdParams>, res: Response, next: NextFunction) => {
    try {
      const orderId = req.params.id;
      const result = await this.orderService.deleteOneOrder(Number(orderId));
      res.status(200).json(result);
    } catch (error: any) {
      next(error);
    }
  };
  createReservation = async (req: UserRequest, res: Response) => {
    try {
      const data = req.body;
      const userId = Number(req.user?.user_id);
      const result = await this.orderService.createReservation(userId, data);

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

  patchOrderStatus = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const orderId = Number(req.params.id);
      const { status } = req.body as { status?: string };
      const result = await this.orderService.updateStatusByAdmin(
        orderId,
        status,
        Number(req.user.user_id),
      );
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default new AdminController();
