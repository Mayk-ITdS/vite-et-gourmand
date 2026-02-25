import { Request, Response } from "express";
import { UserService } from "../services/UserService.js";
import { ApiError, UserRequest } from "../types/users.js";

export class UsersController {
  private userService = new UserService();

  getMyProfile = async (req: UserRequest, res: Response) => {
    try {
      const userId = req.user?.user_id;
      const profile = await this.userService.getProfile(userId!);
      res.json(profile);
    } catch (err) {
      throw new ApiError(500, "Cannot get a profile", false);
    }
  };

  updateMyProfile = async (req: UserRequest, res: Response) => {
    const userId = req.user?.user_id;
    const updated = await this.userService.updateProfile(userId!, req.body);
    res.json(updated);
  };
}
