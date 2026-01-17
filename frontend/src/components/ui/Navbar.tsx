import { Button } from "./button";

const Navbar = () => {
  return (
    <div className="mx-auto flex items-center justify-between px-4 py-4">
      <div className="text-4xl font-semibold">Vites & Gourmand</div>
      <nav className="md:flex items-center gap-3">
        <Button className="text-md" size={"lg"}>
          Notre equipe
        </Button>
        <Button className="text-md" size={"lg"}>
          Voir les menus
        </Button>
        <Button className="text-md" size={"lg"}>
          Connexion
        </Button>
        <Button className="text-md" size={"lg"}>
          Contact
        </Button>
      </nav>
    </div>
  );
};
export default Navbar;
