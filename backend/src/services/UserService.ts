import bcrypt from "bcrypt";

import { UserRepository } from "../repositories/user.repository.js";
import { ApiError } from "../types/users.js";

export class UserService {
  private userRepository = new UserRepository();
  getAllUsers = async () => {
    const users = await this.userRepository.getAllTheUsers();
    return users;
  };
  async getProfile(userId: number) {
    const user = await this.userRepository.findProfileById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return {
      id: user.user_id,
      firstName: user.user_first_name,
      lastName: user.user_last_name,
      email: user.user_email,
      mobileNumber: user.mobile_number,
      city: user.city,
      street: user.street,
      houseNumber: user.house_number,
      zipCode: user.zip_code,
      country: user.country,
      isActive: user.is_active,
    };
  }

  async updateProfile(userId: number, data: any) {
    const updated = await this.userRepository.updateProfile(userId, data);

    if (!updated) {
      throw new ApiError(404, "User not found");
    }

    return {
      id: updated.user_id,
      firstName: updated.user_first_name,
      lastName: updated.user_last_name,
      email: updated.user_email,
      mobileNumber: updated.mobile_number,
      city: updated.city,
      street: updated.street,
      houseNumber: updated.house_number,
      zipCode: updated.zip_code,
      country: updated.country,
      isActive: updated.is_active,
    };
  }

  async createEmployee(dto: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobileNumber: string;
    city: string;
    street: string;
    houseNumber: number;
    zipCode: string;
    country: string;
  }) {
    const passwordHash = await bcrypt.hash(dto.password, 10);

    return await this.userRepository.createStaffUser(
      {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        passwordHash,
        mobileNumber: dto.mobileNumber,
        city: dto.city,
        street: dto.street,
        houseNumber: dto.houseNumber,
        zipCode: dto.zipCode,
        country: dto.country,
      },
      "employee",
    );
  }

  async listEmployees() {
    return await this.userRepository.getEmployees();
  }
}
