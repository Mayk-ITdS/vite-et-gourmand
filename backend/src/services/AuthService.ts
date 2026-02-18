import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { RegisterDTO, LoginDTO } from "../dtos/auth.dto.js";
import { UserRepository } from "../repositories/user.repository.js";
import { ApiError } from "../types/users.js";
import { AdminRepository } from "../repositories/admin.repository.js";
/*
Service class qui contient la logique buissines.
private variable dosen`t have to be explicitely  
declared in contructors body. It`s a ts shortcut
for better scallabullity.

*/

export class AuthService {
  constructor(private userRepo = new UserRepository()) {}

  async register(dto: RegisterDTO) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    console.log("HASH GENERATED:", passwordHash);

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
      console.log("User created:", user);
      console.log("User with role:", userWithRole);
      console.log("JWT secret:", ENV.JWT.SECRET);
      const token = jwt.sign(
        { sub: userWithRole.id, role: userWithRole.role },
        ENV.JWT.SECRET,
        { expiresIn: "1h" },
      );
      console.log("Generated token:", token);
      return {
        token,
        user: userWithRole,
      };
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      }

      throw new ApiError(500, "Internal server error", false);
    }
  }

  async login(dto: LoginDTO) {
    console.log("DTO:", dto);

    try {
      let account;
      let role: "user" | "admin";

      const user = await this.userRepo.findByEmail(dto.email);
      console.log("User FROM DB:", user);
      if (user) {
        account = user;
        role = "user";
        console.log;
      } else {
        const admin = await new AdminRepository().connect(dto.email);
        if (!admin) throw new ApiError(450, "Invalid credentials", false);

        account = admin;
        role = "admin";
      }
      console.log("ADMIN FROM DB:", account);

      if (!account.password_hash) {
        throw new ApiError(450, "Invalid credentials", false);
      }

      const isValid = await bcrypt.compare(dto.password, account.password_hash);
      console.log("haslo z bazy:", account.password_hash);
      console.log("haslo z dto:", dto.password);
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
}
