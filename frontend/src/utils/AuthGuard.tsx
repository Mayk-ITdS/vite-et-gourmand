import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";

export default function AuthGuard() {
  const token = useAppSelector((state) => state.auth.token);

  console.log("TOKEN IN GUARD:", token);
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
