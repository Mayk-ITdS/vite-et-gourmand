import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative z-10 mt-24 border-t border-white/10 bg-black/28 backdrop-blur-2xl">
      <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 md:grid-cols-[1.1fr_0.8fr_0.9fr] md:px-6 lg:px-8">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/12 bg-white/[0.04] text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[#f4efe9]">
              V&G
            </span>
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.34em] text-white/35">
                Maison culinaire
              </p>
              <h3 className="mt-1 text-base font-semibold uppercase tracking-[0.2em] text-white">
                Vite & Gourmand
              </h3>
            </div>
          </div>

          <p className="mt-4 max-w-sm text-sm leading-6 text-white/58">
            Des menus signatures pour dîners privés, soirées élégantes et événements
            professionnels avec une mise en scène premium de bout en bout.
          </p>

          <div className="mt-5 flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/68 transition hover:bg-white/[0.08] hover:text-white"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/68 transition hover:bg-white/[0.08] hover:text-white"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/68 transition hover:bg-white/[0.08] hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 text-sm text-white/65 shadow-[0_18px_45px_rgba(0,0,0,0.2)]">
          <h4 className="text-[0.72rem] uppercase tracking-[0.3em] text-white/35">
            Horaires
          </h4>
          <div className="mt-4 space-y-3">
            <p>Lundi - Vendredi : 9h00 - 18h00</p>
            <p>Samedi : sur demande</p>
            <p>Dimanche : ferme</p>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 text-sm text-white/65 shadow-[0_18px_45px_rgba(0,0,0,0.2)]">
          <h4 className="text-[0.72rem] uppercase tracking-[0.3em] text-white/35">
            Informations
          </h4>
          <div className="mt-4 space-y-3">
            <Link
              to="/mentions"
              className="block transition hover:text-white"
            >
              Mentions légales
            </Link>
            <Link
              to="/conditions"
              className="block transition hover:text-white"
            >
              Conditions générales
            </Link>

            <div className="pt-4 text-white/45">
              <p>© {new Date().getFullYear()} Vite & Gourmand</p>
              <p className="mt-1">10 Place de la Bourse, 33000 Bordeaux</p>
              <p className="mt-1">+33 01 40 68 32</p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
