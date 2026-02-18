import { NavLink } from "react-router-dom";
import { type Dispatch, type SetStateAction } from "react";
import { Button } from "./button";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { HambourgerButton } from "./HabourgerButton";
import { X } from "lucide-react";

const menuElements = [
  { label: "Notre Équipe", href: "/team" },
  { label: "Voir les Menus", href: "/menus" },
  { label: "Espace Personnel", href: "/userpanel" },
  { label: "Contact", href: "/contact" },
];

const MenuMobile: React.FC<{
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}> = ({ onOpenChange, open }) => {
  const closeMenu = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild className="mx-4">
        <HambourgerButton open={open} aria-label="Mobile menu button" />
      </SheetTrigger>

      <SheetContent
        side="top"
        className="
          h-screen w-full
          p-0
          bg-gradient-to-b from-[#140c0b] via-[#2a1a17] to-black
          border-none
          flex flex-col
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Vites & Gourmand
            </h2>
            <p className="text-xs text-white/50">
              Expériences culinaires sur mesure
            </p>
          </div>

          <button
            onClick={closeMenu}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col px-6 py-12 space-y-8 text-2xl font-light flex-grow">
          {menuElements.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={closeMenu}
              className={({ isActive }) =>
                `
                relative
                transition-all duration-300
                ${
                  isActive
                    ? "text-[#facc15] translate-x-2"
                    : "text-white/80 hover:text-white hover:translate-x-2"
                }
              `
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA SECTION */}
        <div className="px-6 pb-10 space-y-4">
          <Button
            onClick={() => {
              closeMenu();
            }}
            asChild
            className="
              w-full h-14
              text-lg
              rounded-2xl
              bg-gradient-to-r from-[#6e2c30] to-[#b36a6f]
              shadow-[0_10px_30px_rgba(140,50,55,0.5)]
              hover:scale-[1.02]
              transition-all
            "
          >
            <NavLink to="/menus">Découvrir les menus</NavLink>
          </Button>

          <Button
            onClick={() => {
              closeMenu();
            }}
            asChild
            variant="secondary"
            className="w-full h-14 rounded-2xl text-lg"
          >
            <NavLink to="/contact">Être rappelé par un chef de projet</NavLink>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuMobile;
