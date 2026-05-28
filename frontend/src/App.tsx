import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useEffectEvent } from "react";
import Home from "./pages/Home";
import MentionsLegales from "./pages/MentionsLegales";
import ConditionsGenerales from "./pages/ConditionsGenerales";
import AppLayout from "./layouts/AppLayout";
import MenusGlobale from "./pages/MenusGlobale";
import AuthorizationPage from "./pages/AuthPage";
import MenuDetails from "./pages/MenuDetails";
import OrderPage from "./pages/OrderPage";
import AuthGuard from "./utils/AuthGuard";
import AdminLayout from "./components/adminPanel/AdminLayout";
import RoleGuard from "./utils/RoleGuard";
import AdminDashboard from "./components/adminPanel/AdminDashboard/AdminDashboard";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { AUTH_EXPIRED_EVENT, setAuthToken } from "./utils/api";
import OrderConfirmation from "./pages/OrderConfirmation";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";
import UserLayout from "./layouts/UserLayout";
import AdminSupplyPage from "./components/adminPanel/AdminSupplyPage";
import AdminGestionMenus from "./components/adminPanel/adminCRUDs/pages/AdminGestionMenus";
import UserSettingsPage from "./components/espaceprive/UserSettingsPage";
import UserOrderDetailsPage from "./components/espaceprive/UserOrderPage";
import UserOrderPage from "./components/espaceprive/UserOrderPage";
import UserDashboard from "./components/espaceprive/UserDashboard";
import ForgotPasswordPage from "./components/adminPanel/authResetPass/ForgotPasswordPage";
import ResetPasswordPage from "./components/adminPanel/authResetPass/ResetPasswordPage";
import AdminGestionUsers from "./components/adminPanel/adminCRUDs/pages/AdminGestionUsers";
import AdminOrdersManager from "./components/adminPanel/adminCRUDs/pages/AdminOrdersManager";
import { logout } from "./store/menus/authSlice";
import { getTokenRemainingMs } from "./utils/authToken";

function AuthSessionWatcher() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAppSelector((state) => state.auth.token);

  const expireSession = useEffectEvent(() => {
    dispatch(logout());

    if (location.pathname !== "/auth") {
      navigate("/auth", { replace: true });
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
  }, [expireSession]);

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
  }, [expireSession, token]);

  return null;
}

function App() {
  return (
    <>
      <Router>
        <AuthSessionWatcher />
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              path="/auth"
              element={<AuthorizationPage />}
            />
            <Route
              path="/mentions"
              element={<MentionsLegales />}
            />
            <Route
              path="/conditions"
              element={<ConditionsGenerales />}
            />
            <Route
              path="/team"
              element={<TeamPage />}
            />
            <Route
              path="/contact"
              element={<ContactPage />}
            />
            <Route
              path="/forgot-password"
              element={<ForgotPasswordPage />}
            />
            <Route
              path="/reset-password"
              element={<ResetPasswordPage />}
            />
            <Route
              path="/menus"
              element={<MenusGlobale />}
            />
            <Route
              path="/menus/:id"
              element={<MenuDetails />}
            />
            <Route
              path="/"
              element={<Home />}
            />
            <Route element={<AuthGuard />}>
              <Route
                path="/orders"
                element={<OrderPage />}
              />
              <Route
                path="/commande/confirmee"
                element={<OrderConfirmation />}
              />
              <Route element={<RoleGuard allowedRoles={["user"]} />}>
                <Route
                  path="/espaceprive"
                  element={<UserLayout />}
                >
                  <Route
                    index
                    element={<UserDashboard />}
                  />
                  <Route
                    path="orders"
                    element={<UserOrderPage />}
                  />
                  <Route
                    path="orders/:orderId"
                    element={<UserOrderDetailsPage />}
                  />
                  <Route
                    path="settings"
                    element={<UserSettingsPage />}
                  />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route element={<RoleGuard allowedRoles={["admin"]} />}>
            <Route
              path="/admin"
              element={<AdminLayout />}
            >
              <Route
                index
                element={<AdminDashboard />}
              />
              {/* <Route path="menus" element={<AdminMenus />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} /> */}
              <Route
                path="/admin/supply"
                element={<AdminSupplyPage />}
              />
              <Route
                path="/admin/menus"
                element={<AdminGestionMenus />}
              />
              <Route
                path="/admin/users"
                element={<AdminGestionUsers />}
              />
              <Route
                path="/admin/orders"
                element={<AdminOrdersManager />}
              />
            </Route>
          </Route>

          {/* EMPLOYEE */}
          {/* <Route element={<RoleGuard allowedRoles={["employee"]} />}>
            <Route path="/employee" element={<EmployeeLayout />}>
              <Route index element={<EmployeeDashboard />} />
              <Route path="orders" element={<EmployeeOrders />} />
            </Route>
          </Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
