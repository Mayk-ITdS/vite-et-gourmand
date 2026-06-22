import { Link, NavLink } from "react-router-dom";

type SidebarItem = {
  label: string;
  path: string;
};
type SidebarSection = {
  title: string;
  items: SidebarItem[];
};

const sections: SidebarSection[] = [
  {
    title: "Dashboard",
    items: [{ label: "Overview", path: "/admin" }],
  },
  {
    title: "Opérations",
    items: [
      { label: "Réservations", path: "/admin/orders" },
      { label: "Menus", path: "/admin/menus" },
      {
        label: "Stocks & Livraisons",
        path: "/admin/supply",
      },
    ],
  },
  {
    title: "Administration",
    items: [
      { label: "Utilisateurs", path: "/admin/users" },
      { label: "Employés", path: "/admin/employees" },
    ],
  },
];

const AdminSidebar = () => {
  return (
    <aside className="w-72 h-screen shrink-0 border-r border-white/10 bg-slate-900/80 backdrop-blur-xl px-5 py-6">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-yellow-400/80">
          Admin Panel
        </p>
        <h2 className="mt-2 text-xl font-semibold text-white">
          <Link to={"/"}> Vite & Gourmand</Link>
        </h2>
        <p className="mt-1 text-sm text-white/50">Gestion du système</p>
      </div>

      <nav className="space-y-7">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="mb-3 text-xs uppercase tracking-wider text-white/35">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  className={({ isActive }) =>
                    [
                      "block rounded-xl px-4 py-2.5 text-sm transition",
                      isActive
                        ? "bg-yellow-500 text-black font-semibold"
                        : "text-white/70 hover:bg-white/10 hover:text-white",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
