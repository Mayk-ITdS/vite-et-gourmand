import type { Opinions } from "@/types/avis";
import { Card, CardContent } from "./card";

const Avis = ({ opinions }: Opinions) => {
  return (
    <section className="container mx-auto max-w-6xl">
      <header className="mb-10 text-center py-20 space-y-5">
        <h2 className="text-4xl font-semibold tracking-tight">
          Nos clients sont notre priorité absolue — et ça paie.
        </h2>
        <h3 className="text-xl md:text-2xl font-medium tracking-tight">
          À en juger par leurs avis, Vite et Gourmand fait la différence :
          qualité, régularité et service irréprochable.
        </h3>
      </header>
      <div className="grid gap-2 md:grid-cols-3 py-3">
        {opinions.map((p) => (
          <Card
            key={p.pseudo}
            className="transition m-auto border-border/40 bg-background/70 full-w max-w-[320px] backdrop-blur-xl transition-shadow hover:shadow-lg"
          >
            <div className="w-30 rounded-md overflow-hidden aspect-[4/5]">
              <img
                className="h-full object-center rounded-md object-content"
                src={p.avatar}
                alt={`${p.pseudo}`}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
            </div>

            <CardContent className="space-y-4 p-6 sm:h-max-40 md:h-max-36 s">
              <div className="md:max-h-30">
                <h3 className="text-lg font-semibold">{p.pseudo}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Score: {p.score}
                </p>
              </div>
              <div className="w-full text-lg ">{p.content}</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Date of deliverd service:{" "}
                {new Date(p.createdAt.$date).toLocaleDateString("fr-FR")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Avis;
