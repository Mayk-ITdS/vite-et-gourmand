import { pgPool } from "../config/db.js";
import {
  ApiError,
  AuthUser,
  DbUser,
  DbUserInsert,
  InsertUserResult,
} from "../types/users.js";

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

  async getRoleByUserId(userId: number): Promise<string | null> {
    const result = await pgPool.query<{ role_name: string }>(
      `SELECT r.role_name
       FROM user_roles ur
       JOIN roles r ON r.role_id = ur.role_id
       WHERE ur.user_id = $1
       LIMIT 1`,
      [userId],
    );

    return result.rows[0]?.role_name ?? null;
  }

  async findById(id: number): Promise<AuthUser> {
    const result = await pgPool.query(
      `SELECT 
      u.user_id,
      u.user_first_name,
      u.user_last_name,
      u.user_email,
      u.mobile_number,
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
  getAllTheUsers = async () => {
    const result = await pgPool.query(`
    SELECT
      user_id,
      user_first_name,
      user_last_name,
      user_email,
      city,
      is_active
    FROM users
    ORDER BY user_id ASC
  `);

    return result.rows;
  };

  async updatePasswordHash(userId: number, passwordHash: string) {
    const result = await pgPool.query<{ user_id: number }>(
      `
      UPDATE users
      SET password_hash = $1
      WHERE user_id = $2
      RETURNING user_id
      `,
      [passwordHash, userId],
    );

    return result.rows[0] ?? null;
  }

  async createStaffUser(
    data: {
      firstName: string;
      lastName: string;
      email: string;
      passwordHash: string;
      mobileNumber: string;
      city: string;
      street: string;
      houseNumber: number;
      zipCode: string;
      country: string;
    },
    roleName: string,
  ): Promise<{ user_id: number; role: string }> {
    const client = await pgPool.connect();

    try {
      await client.query("BEGIN");

      const inserted = await client.query<{ user_id: number }>(
        `INSERT INTO users(
          user_first_name,
          user_last_name,
          user_email,
          password_hash,
          mobile_number,
          city,
          street,
          house_number,
          zip_code,
          country
        )
        VALUES ($1, $2, lower(btrim($3)), $4, $5, $6, $7, $8, $9, $10)
        RETURNING user_id`,
        [
          data.firstName,
          data.lastName,
          data.email,
          data.passwordHash,
          data.mobileNumber,
          data.city,
          data.street,
          data.houseNumber,
          data.zipCode,
          data.country,
        ],
      );

      const userId = inserted.rows[0].user_id;

      const roleResult = await client.query<{ role_id: number }>(
        `SELECT role_id FROM roles WHERE role_name = $1 LIMIT 1`,
        [roleName],
      );

      if (roleResult.rowCount === 0) {
        throw new ApiError(400, `Role ${roleName} not found`);
      }

      await client.query(`INSERT INTO user_roles(user_id, role_id) VALUES ($1, $2)`, [
        userId,
        roleResult.rows[0].role_id,
      ]);

      await client.query("COMMIT");

      return { user_id: userId, role: roleName };
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }

  async getEmployees() {
    const result = await pgPool.query(`
      SELECT
        u.user_id,
        u.user_first_name,
        u.user_last_name,
        u.user_email,
        u.mobile_number,
        u.city,
        u.is_active
      FROM users u
      JOIN user_roles ur ON ur.user_id = u.user_id
      JOIN roles r ON r.role_id = ur.role_id
      WHERE r.role_name = 'employee'
      ORDER BY u.user_id ASC
    `);

    return result.rows;
  }
}
export { UserRepository };
