import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/menus/authSlice";
import { isTokenExpired } from "@/utils/authToken";
import type { RoleGuardProps } from "@/types/roles.types";

const RoleGuard = ({ allowedRoles }: RoleGuardProps) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const expired = isTokenExpired(token);

  useEffect(() => {
    if (token && expired) {
      dispatch(logout());
    }
  }, [dispatch, expired, token]);

  if (!token || expired || !user)
    return (
      <Navigate
        to="/auth"
        replace
      />
    );

  if (!allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <Outlet />;
};
export default RoleGuard;
