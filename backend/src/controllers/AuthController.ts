import { Request, Response } from "express";
import {
  ForgotPasswordDTO,
  LoginDTO,
  RegisterDTO,
  ResetPasswordDTO,
} from "../dtos/auth.dto.js";
import { AuthService } from "../services/AuthService.js";
import { UserRequest } from "../types/users.js";

class AuthController {
  private authService = new AuthService();

  register = async (req: Request<{}, {}, RegisterDTO>, res: Response) => {
    const result = await this.authService.register(req.body);
    return res.status(201).json(result);
  };

  login = async (req: Request<{}, {}, LoginDTO>, res: Response) => {
    const result = await this.authService.login(req.body);
    return res.json(result);
  };

  forgotPassword = async (req: Request<{}, {}, ForgotPasswordDTO>, res: Response) => {
    const result = await this.authService.forgotPassword(req.body);
    return res.json(result);
  };

  resetPassword = async (req: Request<{}, {}, ResetPasswordDTO>, res: Response) => {
    const result = await this.authService.resetPassword(req.body);
    return res.json(result);
  };

  me = async (req: UserRequest, res: Response) => {
    const user = await this.authService.me(req.user!.user_id);
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.json(user);
  };
}

export default new AuthController();
