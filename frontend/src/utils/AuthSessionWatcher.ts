import { useEffect, useEffectEvent } from "react";
import { getTokenRemainingMs } from "./authToken";
import { AUTH_EXPIRED_EVENT, setAuthToken } from "./api";
import { logout } from "@/store/menus/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useLocation, useNavigate } from "react-router-dom";

const AuthSessionWatcher = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAppSelector((state) => state.auth.token);

  const expireSession = useEffectEvent(() => {
    void dispatch(logout());

    if (location.pathname !== "/auth") {
      void navigate("/auth", { replace: true });
    }
  });

  useEffect(() => {
    setAuthToken(token ?? null);
  }, [token]);

  useEffect(() => {
    const handleUnauthorized = () => {
      expireSession();
    };

    window.addEventListener(AUTH_EXPIRED_EVENT, handleUnauthorized);

    return () => {
      window.removeEventListener(AUTH_EXPIRED_EVENT, handleUnauthorized);
    };
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    const remainingMs = getTokenRemainingMs(token);
    if (remainingMs <= 0) {
      expireSession();
      return;
    }

    const timeoutId = window.setTimeout(() => {
      expireSession();
    }, remainingMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [token]);

  return null;
};
export default AuthSessionWatcher;
