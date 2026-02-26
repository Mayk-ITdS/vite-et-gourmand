import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/menus/authSlice";
import { persistor } from "@/store/store";

import MenuMobile from "./MenuMobile";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    navigate("/");
  };

  return (
    <div className="mx-auto container flex items-center justify-between py-6">
      <div className="text-2xl mx-4 font-semibold tracking-tight">
        <Link to="/">Vites & Gourmand</Link>
      </div>
      <nav className="hidden md:flex items-center gap-10">
        <Link
          className="
          text-md font-medium tracking-wide opaccity-80 
          hover:opacity-100 transition"
          to="/team"
        >
          Notre Equipe
        </Link>
        <Link
          className="
          text-md font-medium tracking-wide opaccity-80 
          hover:opacity-100 transition"
          to="/menus"
        >
          Voir les Menus
        </Link>
        <Link
          className="
          text-md font-medium tracking-wide opaccity-80 
          hover:opacity-100 transition"
          to="/contact"
        >
          Contact
        </Link>
        {!token ? (
          <Link to="/auth">Connexion</Link>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to={user?.role === "admin" ? "/admin" : "/espaceprive"}
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <span className="text-xl">👤</span>
              <span className="font-medium">{user?.email}</span>
            </Link>

            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 transition"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
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
