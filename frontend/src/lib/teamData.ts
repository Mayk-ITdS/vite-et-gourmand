import type { TeamMember } from "@/types/team";
import pierre from "@/assets/pierre-leclerc.png";
import marianne from "@/assets/marriane-durand.png";
import jean from "@/assets/jean-michel-dubois.png";
export const teamData: TeamMember[] = [
  {
    name: "Pierre Leclerc",
    role: "Chef exécutif",
    subtitle: "Cuisine événementielle & sur-mesure",
    image: pierre,
    bullets: ["10+ ans d’expérience", "Menus adaptés aux régimes & allergènes"],
  },
  {
    name: "Marianne Durand",
    role: "Chef",
    subtitle: "Cuisine raffinée & options végétariennes",
    image: marianne,
    bullets: ["7 ans d’expérience", "Buffets & cocktails premium"],
  },
  {
    name: "Jean-Michel Dubois",
    role: "Sommelier",
    subtitle: "Accords mets & vins",
    image: jean,
    bullets: ["Sélections Bordeaux & nature", "Conseils personnalisés"],
  },
];
