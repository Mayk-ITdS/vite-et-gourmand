import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

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
import EmployeeLayout from "./components/employeePanel/EmployeeLayout";
import EmployeeDashboard from "./components/employeePanel/EmployeeDashboard";
import EmployeeReviews from "./components/employeePanel/EmployeeReviews";
import EmployeeOrders from "./components/employeePanel/EmployeeOrders";
import AuthSessionWatcher from "./utils/AuthSessionWatcher";

function App() {
  return (
    <>
      <Router>
        <AuthSessionWatcher />
        {/* Public */}
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
            {/* Authorized */}
            <Route element={<AuthGuard />}>
              <Route
                path="/orders"
                element={<OrderPage />}
              />
              <Route
                path="/commande/confirmee"
                element={<OrderConfirmation />}
              />
              {/* Auth user */}
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
          {/* ADMIN */}
          <Route element={<RoleGuard allowedRoles={["admin"]} />}>
            <Route
              path="/admin"
              element={<AdminLayout />}
            >
              <Route
                index
                element={<AdminDashboard />}
              />
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
          <Route element={<RoleGuard allowedRoles={["employee", "user"]} />}>
            <Route
              path="/employee"
              element={<EmployeeLayout />}
            >
              <Route
                index
                element={<EmployeeDashboard />}
              />
              <Route
                path="reviews"
                element={<EmployeeReviews />}
              />
              <Route
                path="orders"
                element={<EmployeeOrders />}
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
