import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { glassCard } from "./MentionsLegales";
import { sections } from "@/lib/mockData";
import { useMemo, useState } from "react";
import type { FiltersState } from "@/types/menus";
const MenuGlobale = () => {
  const [filters, setFilters] = useState<FiltersState>({
    theme: "all",
    regime: "all",
  });
  //   const filteredMenus = useMemo(() => {}, []);
  return (
    <div className="w-full flex">
      <div className="min-h-screen">
        <aside className="md:sticky md:top-24 h-fit">
          <Card className={glassCard}>
            <CardTitle></CardTitle>
            <CardContent className="p-5">
              <p className="text-sm font-medium">Filtres</p>
              <Separator className="my-3" />
              <nav className="flex flex-col gap-2 text-sm">
                {sections.map((s) => (
                  <section key={s.id} id={s.id} className="scroll-mt-28">
                    <Card className={glassCard}>
                      <CardContent className="p-6">
                        <h2 className="text-lg font-semibold">{s.label}</h2>
                        <Separator className="my-3" />
                        {s.render(filters, setFilters)}
                      </CardContent>
                    </Card>
                  </section>
                ))}
              </nav>
            </CardContent>
          </Card>
        </aside>
      </div>
      <div>
        <Card className="m-auto border-border/40 bg-background/70 backdrop-blur">
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
};
export default MenuGlobale;
