import { UserRepository } from "../repositories/user.repository.js";
import { ApiError } from "../types/users.js";

export class UserService {
  private userRepository = new UserRepository();

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
    return await this.userRepository.updateProfile(userId, data);
  }
}
