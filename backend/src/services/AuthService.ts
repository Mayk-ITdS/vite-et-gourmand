import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import {
  ForgotPasswordDTO,
  LoginDTO,
  RegisterDTO,
  ResetPasswordDTO,
} from "../dtos/auth.dto.js";
import { UserRepository } from "../repositories/user.repository.js";
import { ApiError } from "../types/users.js";
import { AdminRepository } from "../repositories/admin.repository.js";
import { PasswordResetMailService } from "./password-reset-mail.service.js";
/*
Service class qui contient la logique buissines.
private variable dosen`t have to be explicitely  
declared in contructors body. It`s a ts shortcut
for better scallabillity.

*/

const PASSWORD_RESET_PURPOSE = "password-reset";
const PASSWORD_RESET_TTL = "15m";
const GENERIC_FORGOT_PASSWORD_MESSAGE =
  "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.";

const getPasswordResetSecret = (passwordHash: string) =>
  `${ENV.JWT.SECRET}:${passwordHash}`;

export class AuthService {
  constructor(
    private userRepo = new UserRepository(),
    private adminRepo = new AdminRepository(),
    private passwordResetMailService = new PasswordResetMailService(),
  ) {}

  async register(dto: RegisterDTO) {
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const payload = {
      user_first_name: dto.firstName,
      user_last_name: dto.lastName,
      user_email: dto.email,
      password_hash: passwordHash,
      mobile_number: dto.phone,
      city: dto.city,
      street: dto.street,
      house_number: dto.houseNumber,
      zip_code: dto.zipCode,
      country: dto.country,
    };
    try {
      const user = await this.userRepo.createUser("authClient", payload);
      if (!user) throw new ApiError(500, "Failed to create a user", false);
      const userWithRole = await this.userRepo.findById(Number(user.user_id));

      const token = jwt.sign(
        { sub: userWithRole.id, role: userWithRole.role },
        ENV.JWT.SECRET,
        {
          expiresIn: "1h",
        },
      );

      return {
        token,
        user: userWithRole,
      };
    } catch (err) {
      console.log("Register error : ", err);
      if (err instanceof ApiError) {
        throw err;
      }

      throw new ApiError(500, "Internal server error", false);
    }
  }

  async login(dto: LoginDTO) {
    try {
      let account;
      let role: "user" | "admin" | "employee";

      const user = await this.userRepo.findByEmail(dto.email);

      if (user) {
        account = user;
        const resolvedRole = await this.userRepo.getRoleByUserId(user.user_id);
        role = resolvedRole === "employee" ? "employee" : "user";
      } else {
        const admin = await this.adminRepo.findByEmail(dto.email);
        if (!admin) throw new ApiError(401, "Invalid credentials", false);

        account = admin;
        role = "admin";
      }

      if (!account.password_hash) {
        throw new ApiError(401, "Invalid credentials", false);
      }

      const isValid = await bcrypt.compare(dto.password, account.password_hash);

      if (!isValid) throw new ApiError(450, "Invalid credentials", false);
      const token = jwt.sign(
        {
          sub: account.user_id,
          role,
        },
        ENV.JWT.SECRET,
        { expiresIn: "1h" },
      );
      if (!token) throw new ApiError(401, "No token", false);
      return {
        token,
        user: {
          id: account.user_id,
          email: account.user_email,
          firstName: account.user_first_name,
          lastName: account.user_last_name,
          role,
        },
      };
    } catch (e) {
      throw new ApiError(401, "Invalid credentials", false);
    }
  }

  async me(id: number) {
    const user = await this.userRepo.findById(id);

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
  }

  async forgotPassword(dto: ForgotPasswordDTO) {
    const user = await this.userRepo.findByEmail(dto.email);
    const admin = user ? null : await this.adminRepo.findByEmail(dto.email);
    const account = user ?? admin;

    if (!account) {
      return {
        message: GENERIC_FORGOT_PASSWORD_MESSAGE,
      };
    }

    const role = user ? "user" : "admin";
    const token = jwt.sign(
      {
        sub: account.user_id,
        email: account.user_email,
        role,
        purpose: PASSWORD_RESET_PURPOSE,
      },
      getPasswordResetSecret(account.password_hash),
      { expiresIn: PASSWORD_RESET_TTL },
    );

    const resetUrl = new URL("/reset-password", ENV.FRONTEND_URL);
    resetUrl.searchParams.set("token", token);

    const mailResult = await this.passwordResetMailService.sendPasswordResetEmail({
      email: dto.email,
      resetUrl: resetUrl.toString(),
    });

    return {
      message: GENERIC_FORGOT_PASSWORD_MESSAGE,
      ...(ENV.NODE_ENV !== "production"
        ? {
            debug: {
              resetUrl: resetUrl.toString(),
              transport: mailResult.transport,
              preview: mailResult.preview,
            },
          }
        : {}),
    };
  }

  async resetPassword(dto: ResetPasswordDTO) {
    const decoded = jwt.decode(dto.token) as
      | (jwt.JwtPayload & {
          purpose?: string;
          role?: "user" | "admin";
          sub?: string | number;
          email?: string;
        })
      | null;

    if (
      !decoded ||
      decoded.purpose !== PASSWORD_RESET_PURPOSE ||
      !decoded.sub ||
      !decoded.role ||
      !decoded.email ||
      !["user", "admin"].includes(decoded.role)
    ) {
      throw new ApiError(400, "Invalid or expired reset token", false);
    }

    const account =
      decoded.role === "admin"
        ? await this.adminRepo.findByEmail(decoded.email)
        : await this.userRepo.findByEmail(decoded.email);

    if (!account) {
      throw new ApiError(404, "Account not found", false);
    }

    let payload: jwt.JwtPayload & {
      purpose?: string;
      role?: "user" | "admin";
      sub?: string | number;
      email?: string;
    };

    try {
      payload = jwt.verify(
        dto.token,
        getPasswordResetSecret(account.password_hash),
      ) as typeof payload;
    } catch {
      throw new ApiError(400, "Invalid or expired reset token", false);
    }

    if (
      payload.purpose !== PASSWORD_RESET_PURPOSE ||
      !payload.sub ||
      !payload.role ||
      !payload.email ||
      !["user", "admin"].includes(payload.role)
    ) {
      throw new ApiError(400, "Invalid or expired reset token", false);
    }

    const passwordHash = await bcrypt.hash(dto.newPassword, 10);
    const accountId = Number(payload.sub);

    const result =
      payload.role === "admin"
        ? await this.adminRepo.updatePasswordHash(accountId, passwordHash)
        : await this.userRepo.updatePasswordHash(accountId, passwordHash);

    if (!result) {
      throw new ApiError(404, "Account not found", false);
    }

    return {
      message: "Password reset successful",
    };
  }
}
