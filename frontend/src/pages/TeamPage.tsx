import { SectionSurface } from "@/layouts/SectionSurface";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TeamPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto space-y-16">
      <SectionSurface>
        <div className="p-12 bg-[rgba(30,15,20,0.6)] backdrop-blur-xl text-center">
          <h1 className="text-4xl tracking-widest text-[#facc15] font-light">
            NOTRE ÉQUIPE
          </h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Des chefs passionnés, une exigence gastronomique et une attention
            absolue aux détails. Chaque prestation est portée par une équipe
            dédiée à l’excellence.
          </p>
        </div>
      </SectionSurface>
      <SectionSurface>
        <div className="p-12 bg-[rgba(20,10,15,0.65)] backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="rounded-2xl overflow-hidden bg-[rgba(10,15,40,0.55)] backdrop-blur-lg border border-white/10 hover:scale-[1.02] transition-all duration-500">
              <img
                src="/src/assets/corpo1.avif"
                className="w-full h-80 object-cover"
              />
              <div className="p-6 space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#facc15]">
                  Chef exécutif
                </span>
                <h3 className="text-xl font-semibold">Pierre Leduc</h3>
                <p className="text-sm text-white/70">
                  Spécialiste des expériences gastronomiques privées et des
                  événements haut de gamme.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-[rgba(10,15,40,0.55)] backdrop-blur-lg border border-white/10 hover:scale-[1.02] transition-all duration-500">
              <img
                src="/src/assets/romantic1.jpg"
                className="w-full h-80 object-cover"
              />
              <div className="p-6 space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#facc15]">
                  Chef pâtissière
                </span>
                <h3 className="text-xl font-semibold">Marianne Durand</h3>
                <p className="text-sm text-white/70">
                  Créations raffinées, desserts signatures et harmonie des
                  saveurs.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden bg-[rgba(10,15,40,0.55)] backdrop-blur-lg border border-white/10 hover:scale-[1.02] transition-all duration-500">
              <img
                src="/src/assets/salmon1.jpg"
                className="w-full h-80 object-cover"
              />
              <div className="p-6 space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#facc15]">
                  Responsable événementiel
                </span>
                <h3 className="text-xl font-semibold">Jean-Michel Dubois</h3>
                <p className="text-sm text-white/70">
                  Coordination logistique et excellence du service pour des
                  événements impeccables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionSurface>
      <SectionSurface>
        <div className="p-12 bg-[rgba(40,18,25,0.55)] backdrop-blur-xl text-center space-y-6">
          <h2 className="text-2xl font-light tracking-wide text-[#facc15]">
            Parlons de votre événement
          </h2>
          <Button
            onClick={() => navigate("/contact")}
            className="
              bg-gradient-to-r from-[#6e2c30] to-[#b36a6f]
              text-white
              px-10 py-4
              rounded-2xl
              shadow-[0_10px_30px_rgba(140,50,55,0.5)]
            "
          >
            Contacter l’équipe
          </Button>
        </div>
      </SectionSurface>
    </div>
  );
}
