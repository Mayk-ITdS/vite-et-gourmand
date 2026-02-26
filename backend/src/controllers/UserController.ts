import { Request, Response } from "express";
import { UserService } from "../services/UserService.js";
import { UserRequest } from "../types/users.js";

export class UsersController {
  private userService = new UserService();

  getMyProfile = async (req: UserRequest, res: Response) => {
    const userId = req.user?.user_id;
    const profile = await this.userService.getProfile(userId!);
    res.json(profile);
  };

  updateMyProfile = async (req: UserRequest, res: Response) => {
    const userId = req.user?.user_id;
    const updated = await this.userService.updateProfile(userId!, req.body);
    res.json(updated);
  };
}
