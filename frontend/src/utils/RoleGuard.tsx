import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";
import type { RoleGuardProps } from "@/types/roles.types";

const RoleGuard = ({ allowedRoles }: RoleGuardProps) => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/auth" replace />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
export default RoleGuard;
