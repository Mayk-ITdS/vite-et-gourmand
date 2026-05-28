import { type Dispatch, type SetStateAction } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  LogIn,
  LogOut,
  Phone,
  Shield,
  UserRound,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/menus/authSlice";
import { persistor } from "@/store/store";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import { HambourgerButton } from "./HabourgerButton";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

type MenuEntry = {
  label: string;
  href: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const MenuMobile: React.FC<{
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}> = ({ onOpenChange, open }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, user } = useAppSelector((state) => state.auth);
  const accountLabel =
    user?.role === "admin"
      ? "Panel admin"
      : user?.role === "employee"
        ? "Espace employe"
        : "Espace prive";
  const accountDescription =
    user?.role === "admin"
      ? "Analytics, utilisateurs et supervision des reservations"
      : user?.role === "employee"
        ? "Acces metier et suivi des operations"
        : "Commandes, parametres et suivi de vos reservations";
  const accountHref =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "employee"
        ? "/employee"
        : "/espaceprive";

  const closeMenu = () => onOpenChange(false);
  const accountEntry: MenuEntry = token
    ? {
        label: accountLabel,
        href: accountHref,
        description: accountDescription,
        icon: user?.role === "admin" ? Shield : UserRound,
      }
    : {
        label: "Connexion",
        href: "/auth",
        description: "Suivi des commandes et accès au compte",
        icon: LogIn,
      };
  const menuElements: MenuEntry[] = [
    {
      label: "Notre équipe",
      href: "/team",
      description: "Chefs, savoir-faire et identité de la maison",
      icon: Users,
    },
    {
      label: "Voir les menus",
      href: "/menus",
      description: "Collections, thèmes et filtres d'événements",
      icon: UtensilsCrossed,
    },
    accountEntry,
    {
      label: "Contact",
      href: "/contact",
      description: "Devis, rappel et échange avec un chef de projet",
      icon: Phone,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    void persistor.purge();
    closeMenu();
    navigate("/");
  };

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetTrigger
        asChild
        className="mx-4"
      >
        <HambourgerButton
          open={open}
          aria-label="Mobile menu button"
        />
      </SheetTrigger>

      <SheetContent
        side="top"
        hideCloseButton
        overlayClassName="bg-[rgba(2,6,23,0.64)] backdrop-blur-sm"
        className="
          inset-x-3 top-3
          bottom-3
          overflow-hidden
          p-0
          rounded-[2rem]
          border border-white/10
          bg-[linear-gradient(180deg,rgba(9,13,28,0.97),rgba(20,18,35,0.92))]
          text-white
          flex flex-col
          shadow-[0_30px_80px_rgba(0,0,0,0.45)]
          backdrop-blur-2xl
        "
      >
        <SheetTitle className="sr-only">Menu de navigation mobile</SheetTitle>
        <SheetDescription className="sr-only">
          Accès rapide aux sections principales et à votre espace personnel.
        </SheetDescription>

        <div className="flex h-full flex-col px-4 pb-4 pt-4">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] uppercase tracking-[0.28em] text-[#facc15]">
              Navigation
            </span>

            <SheetClose asChild>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Fermer le menu</span>
              </button>
            </SheetClose>
          </div>

          <div className="mt-4 flex-1 overflow-y-auto overscroll-contain pr-1 no-scrollbar">
            <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(250,204,21,0.14),rgba(255,255,255,0.04))] p-4">
              <p className="text-[0.7rem] uppercase tracking-[0.28em] text-white/45">
                {token ? "Session active" : "Acces compte"}
              </p>
              <div className="mt-2 flex items-start justify-between gap-4">
                <div>
                  <p className="text-base font-medium text-white">
                    {token ? accountLabel : "Connexion client"}
                  </p>
                  <p className="mt-1 text-sm text-white/62">
                    {token
                      ? accountDescription
                      : "Commandes, suivi, facturation et preferences"}
                  </p>
                </div>

                {token && user?.role && user.role !== "user" && (
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[0.7rem] uppercase tracking-[0.22em] text-[#facc15]">
                    {user.role}
                  </span>
                )}
              </div>
            </div>

            <nav className="mt-4 grid gap-3">
              {menuElements.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      cn(
                        "group rounded-[1.5rem] border px-4 py-4 transition-all duration-300",
                        "backdrop-blur-xl",
                        isActive
                          ? "border-[#facc15]/50 bg-[linear-gradient(135deg,rgba(250,204,21,0.16),rgba(255,255,255,0.06))] shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
                          : "border-white/10 bg-white/[0.045] hover:border-white/20 hover:bg-white/[0.08]",
                      )
                    }
                  >
                    {({ isActive }) => (
                      <div className="flex items-center gap-4">
                        <span
                          className={cn(
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border text-[#facc15] transition",
                            isActive
                              ? "border-[#facc15]/30 bg-black/25"
                              : "border-white/10 bg-black/15 group-hover:border-white/20",
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </span>

                        <div className="min-w-0 flex-1">
                          <p className="text-base font-medium text-white">{item.label}</p>
                          <p className="mt-1 text-sm leading-5 text-white/58">
                            {item.description}
                          </p>
                        </div>

                        <ArrowRight
                          className={cn(
                            "h-4 w-4 shrink-0 transition-transform duration-300",
                            isActive
                              ? "translate-x-1 text-[#facc15]"
                              : "text-white/35 group-hover:translate-x-1 group-hover:text-white/70",
                          )}
                        />
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div className="mt-4 grid gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-4">
            <Button
              onClick={closeMenu}
              asChild
              className="h-12 rounded-2xl bg-[linear-gradient(135deg,#8c3237,#5c2530)] text-white shadow-[0_14px_30px_rgba(92,37,48,0.45)] transition hover:opacity-95"
            >
              <Link to="/menus">Découvrir les menus</Link>
            </Button>

            {token ? (
              <Button
                type="button"
                variant="secondary"
                onClick={handleLogout}
                className="h-12 rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Se déconnecter
              </Button>
            ) : (
              <SheetClose asChild>
                <Button
                  asChild
                  variant="secondary"
                  className="h-12 rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10"
                >
                  <Link to="/contact">Être rappelé par un chef de projet</Link>
                </Button>
              </SheetClose>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuMobile;
