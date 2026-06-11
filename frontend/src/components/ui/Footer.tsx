import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  // const opening_hours = {
  //   monday: { open: "09:00", close: "18:00" },
  //   tuesday: { open: "09:00", close: "18:00" },
  //   saturday: { open: null, close: null },
  //   sunday: null,
  // };
  // const timezone = "Europe/Paris";
  // const mockDbData = {
  //   isOpen: true || false,
  //   today: "monday",
  //   opensAt: "09:00",
  //   closesAt: "18:00",
  // };
  // const statusColor = isOpen
  //   ? "text-[rgba(120,160,120,0.9)]"
  //   : "text-[rgba(180,110,90,0.9)]";

  return (
    <footer
      style={{
        background: "rgba(2,6,23,0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
      className="mt-32"
    >
      <section className="container mx-auto max-w-6xl px-4 py-6 grid gap-12 md:grid-cols-3 items-start">
        <div className="space-y-4">
          <h3 className="text-lg font-medium tracking-tight">
            Vite & Gourmand
          </h3>

          <p className="text-sm opacity-60 max-w-xs">
            Catering premium pour événements privés et professionnels.
          </p>

          <div className="flex gap-4 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* OPENING HOURS */}
        <div className="space-y-2 text-sm opacity-70">
          <h4 className="font-medium opacity-90">Horaires d’ouverture</h4>
          <p>Lundi – Vendredi : 9h00 – 18h00</p>
          <p>Samedi : sur demande</p>
          <p>Dimanche : fermé</p>
          {/* <p className={`text-sm font-medium ${statusColor}`}>
            {isOpen
              ? `Ouvert maintenant — jusqu’à ${closesAt}`
              : `Fermé — ouvre demain à ${opensAt}`}
          </p> */}
        </div>
        <div className="text-sm opacity-60 md:text-right space-y-2">
          <Link to="/mentions" className="block hover:opacity-100 transition">
            Mentions légales
          </Link>
          <Link to="/conditions" className="block hover:opacity-100 transition">
            Conditions générales
          </Link>

          <p className="pt-4 opacity-50">
            © {new Date().getFullYear()} Vite & Gourmand
          </p>
          <p className="opacity-50">10 Place de la Bourse, 33000 Bordeaux</p>
          <p className="opacity-50">+33 01 40 68 32</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
