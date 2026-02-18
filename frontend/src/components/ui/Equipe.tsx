import type { TeamMember } from "@/types/team";

import { Card, CardContent } from "./card";

type EquipeProps = { members: TeamMember[] };

const Equipe: React.FC<EquipeProps> = ({ members }) => {
  return (
    <section className="relative hidden lg:block w-full py-12">
      <header className="space-y-4 text-center max-w-6xl mx-auto">
        <h2 className="text-md md:text-2xl font-semibold tracking-tight">
          Ils donnent vie à vos événements
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          Chefs, sommeliers et experts du service travaillent ensemble pour
          créer des expériences culinaires mémorables.
        </p>
      </header>
      <div className="flex flex-wrap gap-6 py-12">
        {members.map((p) => (
          <Card
            key={p.name}
            className="
                col-span-2
                lg:m-auto   
                lg:w-sm
                text-white
                border border-white/30
                overflow-hidden
                backdrop-blur-xl
                transition-all duration-300
                hover:-translate-y-2
                hover:shadow-[0_40px_80px_rgba(0,0,0,0.55)]
              "
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))",
              boxShadow:
                "0 25px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            <div className="relative h-auto w-full overflow-hidden aspect-[4/5]">
              <img
                className="h-auto object-cover"
                src={p.image}
                alt={`${p.name}, ${p.role}`}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span
                  className="
                    inline-flex
                    rounded-full
                    bg-primary/90
                    px-4 py-1
                    text-xs md:text-sm font-semibold
                    uppercase tracking-wide
                    text-primary-foreground
                    shadow
                  "
                >
                  {p.role}
                </span>
              </div>
            </div>
            <CardContent className="space-y-2 p-3">
              <div className="">
                <h3 className="text-md md:text-xl font-medium tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm md:text-sm text-muted-foreground">
                  {p.subtitle}
                </p>
              </div>
              <ul className="space-y-1 text-sm md:text-sm opacity-75">
                {p.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Equipe;
