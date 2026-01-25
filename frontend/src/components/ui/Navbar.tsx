import { useState } from "react";
import { Button } from "./button";
import MenuMobile from "./MenuMobile";
import { Link } from "react-router-dom";

const menuElements = [
  { label: "Notre Equipe", href: "/team" },
  { label: "Voir les Menus", href: "/menus" },
  { label: "Connexion", href: "/login" },
  { label: "Contact", href: "/contact" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-auto container flex items-center justify-between px-4 py-4">
      <div className="text-4xl font-semibold">
        <Link to="/">Vites & Gourmand</Link>
      </div>
      <nav className="hidden md:flex items-center gap-3">
        {menuElements.map((p, k) => (
          <Button
            size={"lg"}
            key={k}
            variant="secondary"
            className="h-8 text-md bg-base"
            asChild
          >
            <Link to={p.href}>{p.label}</Link>
          </Button>
        ))}
      </nav>
      <div className="lg:hidden">
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
