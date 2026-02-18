import { pgPool } from "../config/db.js";
import { ApiError, AuthUser, DbUser, DbUserInsert } from "../types/users.js";
type InsertUserResult = {
  result: {
    user_id: number;
    role: string;
  };
};

class UserRepository {
  async createUser(
    mode: string,
    dto: DbUserInsert,
  ): Promise<{ user_id: number; role: string }> {
    const result = await pgPool.query<InsertUserResult>(
      `SELECT public.insert_new_user($1, $2) as result`,
      [mode, dto],
    );
    if (result.rowCount === 0) {
      throw new ApiError(500, "Ingest function error", true);
    }
    return result.rows[0].result;
  }

  async findByEmail(email: string): Promise<DbUser> {
    const result = await pgPool.query<DbUser>(
      `SELECT * FROM users WHERE user_email = $1`,
      [email],
    );

    return result.rows[0] ?? null;
  }

  async findById(id: number): Promise<AuthUser> {
    const result = await pgPool.query(
      `SELECT 
      u.user_id,
      u.user_first_name,
      u.user_last_name,
      u.user_email,
      u.user_phone,
      r.role_name
    FROM users u
    LEFT JOIN user_roles ur ON u.user_id = ur.user_id
    LEFT JOIN roles r ON ur.role_id = r.role_id
    WHERE u.user_id = $1`,
      [id],
    );

    return result.rows[0] || null;
  }
  async findProfileById(userId: number): Promise<DbUser | null> {
    const result = await pgPool.query<DbUser>(
      `
    SELECT 
      user_id,
      user_first_name,
      user_last_name,
      user_email,
      mobile_number,
      city,
      street,
      house_number,
      zip_code,
      country,
      is_active
    FROM users
    WHERE user_id = $1
    `,
      [userId],
    );

    return result.rows[0] ?? null;
  }

  async updateProfile(
    userId: number,
    data: {
      firstName: string;
      lastName: string;
      mobileNumber: string;
      city: string;
      street: string;
      houseNumber: number;
      zipCode: string;
      country: string;
    },
  ) {
    const result = await pgPool.query(
      `
    UPDATE users
    SET
      user_first_name = $1,
      user_last_name = $2,
      mobile_number = $3,
      city = $4,
      street = $5,
      house_number = $6,
      zip_code = $7,
      country = $8
    WHERE user_id = $9
    RETURNING
      user_id,
      user_first_name,
      user_last_name,
      user_email,
      mobile_number,
      city,
      street,
      house_number,
      zip_code,
      country,
      is_active
    `,
      [
        data.firstName,
        data.lastName,
        data.mobileNumber,
        data.city,
        data.street,
        data.houseNumber,
        data.zipCode,
        data.country,
        userId,
      ],
    );

    return result.rows[0] ?? null;
  }
}
export { UserRepository };
