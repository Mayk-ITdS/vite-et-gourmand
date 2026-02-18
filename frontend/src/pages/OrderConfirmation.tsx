import { Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import { SectionSurface } from "@/layouts/SectionSurface";

export default function OrderConfirmation() {
  const navigate = useNavigate();

  return (
    <SectionSurface>
      <div className="min-h-[65vh] flex items-center justify-center">
        <div
          className="
            text-center
            space-y-6
            p-10
            max-w-lg
            w-full
            bg-[rgba(10,15,40,0.45)]
            backdrop-blur-xl
            rounded-2xl
            border border-white/10
            shadow-[0_20px_60px_rgba(0,0,0,0.5)]
            animate-fade-in
          "
        >
          <CheckCircleOutlineIcon
            sx={{ fontSize: 90 }}
            className="text-white/90 mx-auto"
          />

          <h1 className="text-3xl font-semibold tracking-tight">
            Commande confirmée.
          </h1>

          <p className="text-white/80 text-lg">Merci de votre confiance ✨</p>

          <p className="text-white/60 text-sm leading-relaxed">
            L’équipe Vite & Gourmand prépare votre événement avec soin.
            <br />
            Un email de confirmation vous a été envoyé.
          </p>

          <Button
            onClick={() => navigate("/")}
            className="
              mt-6
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              font-semibold
              px-6
            "
          >
            Retour à l’accueil
          </Button>
        </div>
      </div>
    </SectionSurface>
  );
}
