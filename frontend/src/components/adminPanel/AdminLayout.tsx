import { Outlet, NavLink } from "react-router-dom";

import AdminDashboard from "./AdminDashboard";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-[#0f172a] text-white">
      <aside className="w-64 bg-[#111827] border-r border-white/10 p-6">
        <h2 className="text-lg font-semibold tracking-widest text-[#d4af37] uppercase mb-10">
          Admin Panel
        </h2>

        <nav className="space-y-4 text-sm">
          <AdminLink to="/admin">Dashboard</AdminLink>
          <AdminLink to="/admin/menus">Menus</AdminLink>
          <AdminLink to="/admin/items">Items</AdminLink>
          <AdminLink to="/admin/orders">Orders</AdminLink>
          <AdminLink to="/admin/users">Users</AdminLink>
          <AdminLink to="/admin/stock">Stock</AdminLink>
        </nav>
      </aside>

      <AdminDashboard />
      <main className="flex-1 p-12">
        <Outlet />
      </main>
    </div>
  );
};

const AdminLink = ({ to, children }: any) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-2 rounded-md transition ${
        isActive ? "bg-[#d4af37] text-black font-medium" : "hover:bg-white/5"
      }`
    }
  >
    {children}
  </NavLink>
);

export default AdminLayout;
