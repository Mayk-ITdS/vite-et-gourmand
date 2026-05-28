import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/menus/authSlice";
import { isTokenExpired } from "@/utils/authToken";

export default function AuthGuard() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const expired = isTokenExpired(token);

  useEffect(() => {
    if (token && expired) {
      dispatch(logout());
    }
  }, [dispatch, expired, token]);

  if (!token || expired) {
    return (
      <Navigate
        to="/auth"
        replace
      />
    );
  }

  return <Outlet />;
}
