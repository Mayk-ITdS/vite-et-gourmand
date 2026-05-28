import { pgPool } from "../config/db.js";
import { DbUser } from "../types/users.js";

class AdminRepository {
  async connect(email: string): Promise<DbUser> {
    const admin = await pgPool.query(
      `Select admin_id AS user_id,
      admin_password AS password_hash,
      admin_email AS user_email,
      role_id
      from administration
      where admin_email = $1`,
      [email],
    );
    return admin.rows[0];
  }

  async findByEmail(email: string): Promise<DbUser | null> {
    return this.connect(email);
  }

  async updatePasswordHash(adminId: number, passwordHash: string) {
    const result = await pgPool.query<{ admin_id: number }>(
      `
      UPDATE administration
      SET admin_password = $1
      WHERE admin_id = $2
      RETURNING admin_id
      `,
      [passwordHash, adminId],
    );

    return result.rows[0] ?? null;
  }
}
export { AdminRepository };
