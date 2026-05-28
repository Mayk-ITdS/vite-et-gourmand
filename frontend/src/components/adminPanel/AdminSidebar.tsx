import { Link, NavLink } from "react-router-dom";
import {
  Boxes,
  LayoutDashboard,
  PackagePlus,
  ShieldCheck,
  UtensilsCrossed,
  Users,
} from "lucide-react";

type SidebarItem = {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
};

type SidebarSection = {
  title: string;
  items: SidebarItem[];
};

const sections: SidebarSection[] = [
  {
    title: "Dashboard",
    items: [{ label: "Overview", path: "/admin", icon: LayoutDashboard }],
  },
  {
    title: "Opérations",
    items: [
      { label: "Réservations", path: "/admin/orders", icon: ShieldCheck },
      { label: "Menus", path: "/admin/menus", icon: UtensilsCrossed },
      {
        label: "Stocks & Livraisons",
        path: "/admin/supply",
        icon: PackagePlus,
      },
    ],
  },
  {
    title: "Administration",
    items: [{ label: "Utilisateurs", path: "/admin/users", icon: Users }],
  },
];

const AdminSidebar = () => {
  return (
    <aside className="hidden h-screen w-[290px] shrink-0 border-r border-white/10 bg-[linear-gradient(180deg,rgba(13,17,24,0.96),rgba(8,11,18,0.92))] px-5 py-6 backdrop-blur-xl xl:block">
      <div className="mb-8 rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-white">
            V&G
          </span>
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/32">
              Control room
            </p>
            <h2 className="mt-1 text-base font-semibold uppercase tracking-[0.18em] text-white">
              <Link to="/">Vite & Gourmand</Link>
            </h2>
          </div>
        </div>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#a43c57]/30 bg-[#8d314b]/18 px-3 py-1 text-[0.68rem] uppercase tracking-[0.28em] text-[#f1d6dc]">
          <Boxes className="h-3.5 w-3.5" />
          Admin space
        </div>
        <p className="mt-3 text-sm leading-6 text-white/48">
          Gestion éditoriale, commandes et livraisons.
        </p>
      </div>

      <nav className="space-y-7">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="mb-3 text-xs uppercase tracking-wider text-white/35">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/admin"}
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-3 rounded-[1.1rem] px-4 py-3 text-sm transition",
                        isActive
                          ? "bg-[linear-gradient(135deg,#a43c57,#742b3f)] text-white font-semibold shadow-[0_18px_40px_rgba(116,43,63,0.28)]"
                          : "text-white/70 hover:bg-white/10 hover:text-white",
                      ].join(" ")
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4 text-sm text-white/50">
        Navigation hi-fi resserrée pour coller au maquettage admin sombre.
      </div>
    </aside>
  );
};

export default AdminSidebar;
