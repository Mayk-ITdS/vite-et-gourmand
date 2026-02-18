import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import MentionsLegales from "./pages/MentionsLegales";
import ConditionsGenerales from "./pages/ConditionsGenerales";
import AppLayout from "./layouts/AppLayout";
import MenusGlobale from "./pages/MenusGlobale";
import UserPanel from "./pages/UserPanel";
import AuthorizationPage from "./pages/AuthPage";
import MenuDetails from "./pages/MenuDetails";
import OrderPage from "./pages/OrderPage";
import AuthGuard from "./utils/AuthGuard";
import AdminLayout from "./components/adminPanel/AdminLayout";
import RoleGuard from "./utils/RoleGuard";
import AdminDashboard from "./components/adminPanel/AdminDashboard";
import { useAppSelector } from "./store/hooks";
import { setAuthToken } from "./utils/api";
import OrderConfirmation from "./pages/OrderConfirmation";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";

function App() {
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/auth" element={<AuthorizationPage />} />
            <Route path="/mentions" element={<MentionsLegales />} />
            <Route path="/conditions" element={<ConditionsGenerales />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/menus" element={<MenusGlobale />} />
            <Route path="/menus/:id" element={<MenuDetails />} />
            <Route element={<AuthGuard />}>
              <Route path="/orders" element={<OrderPage />} />
              <Route
                path="/commande/confirmee"
                element={<OrderConfirmation />}
              />
              <Route path="/espaceprive" element={<UserPanel />} />
              <Route path="/adminpanel" element={<AdminLayout />} />
              <Route path="/contact" />
              <Route path="/" element={<Home />} />
            </Route>
          </Route>

          <Route element={<RoleGuard allowedRoles={["user"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              {/* <Route path="menus" element={<AdminMenus />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} /> */}
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
