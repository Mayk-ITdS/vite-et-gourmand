import { pgPool } from "../config/db.js";
import { AuthUser, DbUser } from "../types/users.js";

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
}
export { AdminRepository };
