import type { ClientOpinion } from "@/types/avis";
import type { FiltersState, Section, ThemeValue } from "@/types/menus";
import { DietCircleButton } from "@/components/ui/DietCircleButton";
import { Slider } from "@/components/ui/slider";
import { themeValues } from "@/types/menus";
import { glassCard } from "@/pages/MentionsLegales";

import { cn } from "./utils";

export const opinions: ClientOpinion[] = [
  {
    _id: { $id: "65b0a1f2c9d84a1a2b3c4d01" },
    order_id: "VEG-2026-0011",
    pseudo: "Camille92",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    content:
      "Buffet délicieux et très bien présenté; livraison ponctuelle, équipe souriante. Nos invités ont tout fini et en redemandent encore.",
    score: 5,
    createdAt: { $date: "2026-01-03T12:10:00Z" },
  },
  {
    _id: { $id: "65b0a1f2c9d84a1a2b3c4d02" },
    order_id: "VEG-2026-0012",
    pseudo: "Nico_Bdx",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    content:
      "Organisation au top: commande claire, options végétariennes excellentes et allergènes bien indiqués. Tout le monde a adoré le cocktail.",
    score: 5,
    createdAt: { $date: "2026-01-05T18:40:00Z" },
  },
  {
    _id: { $id: "65b0a1f2c9d84a1a2b3c4d03" },
    order_id: "VEG-2026-0013",
    pseudo: "LolaEvent",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    content:
      "Plats savoureux, portions généreuses et matériel propre. Petit couac sur une sauce, mais le service a réagi vite et pro.",
    score: 4,
    createdAt: { $date: "2026-01-07T20:05:00Z" },
  },
  {
    _id: { $id: "65b0a1f2c9d84a1a2b3c4d04" },
    order_id: "VEG-2026-0014",
    pseudo: "Marc75",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    content:
      "Très bon cocktail dînatoire pour notre séminaire: produits frais, verrines variées, et reprise du matériel rapide après l’événement.",
    score: 5,
    createdAt: { $date: "2026-01-09T16:25:00Z" },
  },
  {
    _id: { $id: "65b0a1f2c9d84a1a2b3c4d05" },
    order_id: "VEG-2026-0015",
    pseudo: "Sophie_P",
    avatar: "https://randomuser.me/api/portraits/women/48.jpg",
    content:
      "Qualité correcte mais livraison avec 20 minutes de retard. Heureusement la présentation était soignée et les desserts vraiment excellents.",
    score: 3,
    createdAt: { $date: "2026-01-11T13:02:00Z" },
  },
  {
    _id: { $id: "65b0a1f2c9d84a1a2b3c4d06" },
    order_id: "VEG-2026-0016",
    pseudo: "JulienPro",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    content:
      "Équipe professionnelle du début à la fin: conseils sur les quantités, adaptation sans gluten, et communication fluide et rassurante.",
    score: 5,
    createdAt: { $date: "2026-01-13T19:18:00Z" },
  },
  {
    _id: { $id: "65b0a1f2c9d84a1a2b3c4d07" },
    order_id: "VEG-2026-0017",
    pseudo: "Aline33",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    content:
      "Nous avons adoré les mini-burgers et les bouchées chaudes. Tout est arrivé bien chaud, emballé proprement, sans stress le jour J.",
    score: 5,
    createdAt: { $date: "2026-01-15T21:10:00Z" },
  },
  {
    _id: { $id: "65b0a1f2c9d84a1a2b3c4d08" },
    order_id: "VEG-2026-0018",
    pseudo: "TheoM",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    content:
      "Service parfait pour un anniversaire: installation discrète, plats raffinés, et vraie attention aux détails. Nos invités étaient ravis.",
    score: 5,
    createdAt: { $date: "2026-01-17T12:45:00Z" },
  },
  {
    _id: { $id: "65b0a1f2c9d84a1a2b3c4d09" },
    order_id: "VEG-2026-0019",
    pseudo: "Claire_L",
    avatar: "https://randomuser.me/api/portraits/women/31.jpg",
    content:
      "Bon rapport qualité/prix, surtout pour les pièces sucrées. J’aurais aimé plus de choix en boissons, mais globalement excellent.",
    score: 4,
    createdAt: { $date: "2026-01-19T18:55:00Z" },
  },
  {
    _id: { $id: "65b0a1f2c9d84a1a2b3c4d0a" },
    order_id: "VEG-2026-0020",
    pseudo: "MaximeK",
    avatar: "https://randomuser.me/api/portraits/men/29.jpg",
    content:
      "Expérience mitigée: certains canapés un peu secs, mais le reste très bon. Support client aimable et geste commercial apprécié.",
    score: 3,
    createdAt: { $date: "2026-01-22T17:50:00Z" },
  },
];
const diets = ["Classique", "Vegan", "Vegetarien"] as const;

const toggleTheme = (
  value: ThemeValue,
  setState: React.Dispatch<React.SetStateAction<FiltersState>>,
) => {
  setState((prev) => {
    const current = prev.themes ?? [];
    return {
      ...prev,
      themes: current.includes(value)
        ? current.filter((v: ThemeValue) => v !== value)
        : [...current, value],
    };
  });
};
export const sections: Section[] = [
  {
    id: "prix",
    label: "Prix",
    render: (state, setState) => (
      <div className={cn(glassCard, "space-y-3")}>
        {
          <fieldset className="flex flex-col">
            <label>min</label>
            <input
              id="prix-min"
              type="number"
              value={state.priceMin ?? ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setState((prev) => ({
                  ...prev,
                  priceMin: Number(e.target.value),
                }))
              }
              className="h-11 px-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
            />
            <label>max</label>
            <input
              type="number"
              value={state.priceMax ?? ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setState((prev) => ({
                  ...prev,
                  priceMax: Number(e.target.value),
                }))
              }
              id="prix-max"
              className="h-11 px-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
            />
          </fieldset>
        }
      </div>
    ),
  },
  {
    id: "theme",
    label: "Thème",
    render: (state, setState) => (
      <div className="space-y-3">
        {
          <fieldset className="flex gap-4 flex-col">
            {themeValues.map((theme) => {
              const isSelected = state.themes?.includes(theme) ?? false;
              return (
                <button
                  key={theme}
                  data-theme={state.themes}
                  onClick={() => toggleTheme(theme, setState)}
                  className={cn(
                    "w-full py-3 px-5 rounded-xl text-sm font-medium transition-all duration-300",
                    "border border-white/10",
                    isSelected
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white/5 text-white/70 hover:bg-white/10",
                  )}
                >
                  {theme}
                </button>
              );
            })}
          </fieldset>
        }
      </div>
    ),
  },
  {
    id: "regime",
    label: "Régime",
    render: (state, setState) => (
      <div className="py-2 bg-black/10 flex items-center justify-center p-4 rounded-2xl border border-white/10">
        {
          <fieldset className="flex gap-5 py-2 justify-around">
            {diets.map((d) => (
              <div key={d} className="flex flex-col items-center">
                <DietCircleButton
                  selected={state.regime?.includes(d) ?? false}
                  diet={d}
                  onSelect={(d) =>
                    setState((prev) => {
                      const current = prev.regime ?? [];
                      return {
                        ...prev,
                        regime: current.includes(d)
                          ? current.filter((r) => r !== d)
                          : [...current, d],
                      };
                    })
                  }
                />
                <p className="text-xs px-2 font-medium text-secondary-foreground">
                  {d}
                </p>
              </div>
            ))}
          </fieldset>
        }
      </div>
    ),
  },
  {
    id: "personnes",
    label: "Personnes minimum",
    render: (state, setState) => {
      const [minP, maxP] = state.rangePeople ?? [1, 100];
      return (
        <div className="space-y-3">
          {
            <Slider
              min={1}
              max={100}
              defaultValue={[1, 100]}
              onValueCommit={([a, b]) => {
                setState((prev) => ({
                  ...prev,
                  rangePeople: [Math.min(a, b), Math.max(a, b)],
                }));
              }}
            />
          }
          <p className="text-sm text-white/60 mt-3">
            {minP} personnes → {maxP} personnes
          </p>
        </div>
      );
    },
  },
];
