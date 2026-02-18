export const roleValues = ["admin", "employee", "user"] as const;

type UserRole = (typeof roleValues)[number];
type RoleGuardProps = {
  allowedRoles: UserRole[];
};
export { type RoleGuardProps, type UserRole };
