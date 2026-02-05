import type { TeamMember } from "@/types/team";
import { Card, CardContent } from "./card";

type EquipeProps = { members: TeamMember[] };

const Equipe: React.FC<EquipeProps> = ({ members }) => {
  return (
    <section className="container mx-auto max-w-6xl py-12">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-semibold tracking-tight">
          Une équipe de professionnels dédiée à votre événement
        </h2>
        <p className="mt-3 text-md text-muted-foreground">
          Chefs & sommelier travaillent ensemble pour garantir qualité,
          régularité et accords parfaits.
        </p>
      </header>
      <div className="grid md:grid-cols-6 py-20">
        {members.map((p) => (
          <Card
            key={p.name}
            className="transition col-span-2 m-auto border-border/40 bg-background/70 full-w max-w-[320px] backdrop-blur-xl transition-shadow hover:shadow-lg"
          >
            <div className="relative w-full max-h-[350px] max-w-[320px] sm:max-h-[350px] overflow-hidden aspect-[4/5]">
              <img
                className="h-full w-full object-center rounded-md object-cover"
                src={p.image}
                alt={`${p.name}, ${p.role}`}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  {p.role}
                </span>
              </div>
            </div>

            <CardContent className="space-y-4 p-6 sm:max-h-40 md:max-h-36  ">
              <div className="md:max-h-30">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.subtitle}
                </p>
              </div>

              <ul className="space-y-1 text-sm text-muted-foreground">
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
