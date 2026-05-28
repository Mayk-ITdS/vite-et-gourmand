import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut, Sparkles } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/menus/authSlice";
import { persistor } from "@/store/store";

import MenuMobile from "./MenuMobile";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, user } = useAppSelector((state) => state.auth);
  const navItems = [
    { label: "Accueil", href: "/" },
    { label: "Menus", href: "/menus" },
    { label: "A propos", href: "/team" },
    { label: "Contact", href: "/contact" },
  ];
  const accountLabel =
    user?.role === "admin"
      ? "Panel admin"
      : user?.role === "employee"
        ? "Espace employe"
        : "Espace prive";
  const accountHref =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "employee"
        ? "/employee"
        : "/espaceprive";

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    void dispatch(logout());
    void persistor.purge();
    void navigate("/");
  };

  return (
    <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-4 md:px-6 lg:px-8">
      <Link
        to="/"
        className="flex items-center gap-3"
      >
        <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/12 bg-white/[0.04] text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[#f4efe9] shadow-[0_18px_40px_rgba(0,0,0,0.2)]">
          V&G
        </span>

        <span className="leading-none">
          <span className="block text-[0.62rem] uppercase tracking-[0.34em] text-white/38">
            Maison culinaire
          </span>
          <span className="mt-1 block text-sm font-semibold uppercase tracking-[0.22em] text-[#f7f1ea] md:text-base">
            Vite & Gourmand
          </span>
        </span>
      </Link>

      <nav className="hidden items-center gap-2 md:flex">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === "/"}
            className={({ isActive }) =>
              [
                "rounded-full px-4 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-white/12 text-white shadow-[0_12px_30px_rgba(0,0,0,0.22)]"
                  : "text-white/62 hover:bg-white/6 hover:text-white",
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="hidden items-center gap-3 md:flex">
        {!token ? (
          <>
            <Link
              to="/auth"
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/86 transition hover:bg-white/[0.08]"
            >
              Connexion
            </Link>

            <Link
              to="/menus"
              className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#a43c57,#742b3f)] px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(116,43,63,0.38)] transition hover:opacity-95"
            >
              <Sparkles className="h-4 w-4" />
              Explorer
            </Link>
          </>
        ) : (
          <>
            <Link
              to={accountHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition hover:bg-white/[0.08]"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#8f314c] text-xs font-semibold uppercase text-white">
                {user?.role?.[0] ?? "U"}
              </span>
              {accountLabel}
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/58 transition hover:text-[#f4efe9]"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </>
        )}
      </div>

      <div className="md:hidden">
        <MenuMobile
          onOpenChange={setIsOpen}
          open={isOpen}
          aria-label="Mobile menu button"
        />
      </div>
    </div>
  );
};
export default Navbar;
