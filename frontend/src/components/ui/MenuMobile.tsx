import { Button } from "./button";
import { Link } from "react-router-dom";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./sheet";
import { HambourgerButton } from "./HabourgerButton";
import { type Dispatch, type SetStateAction } from "react";

const menuElements = [
  { label: "Notre Equipe", href: "/team" },
  { label: "Voir les Menus", href: "/menus" },
  { label: "Connexion", href: "/login" },
  { label: "Contact", href: "/contact" },
];

const MenuMobile: React.FC<{
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}> = ({ onOpenChange, open }) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <HambourgerButton open={open} aria-label="Mobile menu button" />
      </SheetTrigger>
      <SheetContent side="top" className="sm:w-full ">
        <div className="flex px-2 items-center justify-between">
          <Link to="/" className="text-base font-semibold">
            Vite & Gourmand
          </Link>
          <SheetClose asChild>
            <Button variant="ghost" size="sm">
              Close
            </Button>
          </SheetClose>
        </div>
        <nav className="mt-6 flex flex-col gap-3">
          {menuElements.map((item, key) => (
            <SheetClose
              asChild
              key={key}
              className="flex justify-around w-full text-md"
              onClick={(open) => !open}
            >
              <Link
                to={item.href}
                className="rounded-md px-2 py-2 text-sm font-medium hover:bg-accent"
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
        <div className="mt-6 flex gap-2">
          <SheetClose asChild>
            <Button asChild className="w-full">
              <Link to="/sign-in">Sign in</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default MenuMobile;
