import type { TeamMember } from "@/types/team";
import { Card, CardContent } from "./card";

type EquipeProps = { members: TeamMember[] };

const Equipe: React.FC<EquipeProps> = ({ members }) => {
  return (
    <section className="mx-auto max-w-6xl py-12">
      <header className="mb-10 text-center">
        <h2 className="text-3xl font-semibold tracking-tight">
          Une équipe de professionnels dédiée à votre événement
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Chefs & sommelier travaillent ensemble pour garantir qualité,
          régularité et accords parfaits.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {members.map((p) => (
          <Card
            key={p.name}
            className="overflow-hidden transition hover:shadow-lg"
          >
            <div className="relative aspect-[3/4]">
              <img
                className="h-full w-full object-cover"
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

            <CardContent className="space-y-4 p-6">
              <div>
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
