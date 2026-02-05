import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { glassCard } from "./MentionsLegales";
import { sections } from "@/lib/mockData";
import { useEffect, useState } from "react";
import type { FiltersState } from "@/types/menus";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMenus } from "@/store/menus/menusSlice";
const MenuGlobale = () => {
  const [filters, setFilters] = useState<FiltersState>({
    priceMax: 0,
    priceMin: 0,
    priceRangeMax: 0,
    theme: [],
    regime: [],
    minPeople: 2,
    maxPeople: 100,
    rangePeople: [],
  });
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.menus.status);
  const error = useAppSelector((state) => state.menus.error);

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  const data = useAppSelector((state) => state.menus.data);
  if (status === "loading") return <p>Chargement…</p>;
  if (status === "failed") return <p>Erreur : {error}</p>;
  if (!data.length) return <p>Aucun menu</p>;
  if (data.length === 0) return <p>Loading menus...</p>;

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
        {data.map((menu) => (
          <Card
            key={menu.menu_id}
            className="m-auto border-border/40 bg-background/70 backdrop-blur-md shadow-lg"
          >
            <CardContent>
              <ul>
                <li>{menu.menu_id}</li>
                <li>{menu.menu_name}</li>
                <li>{menu.menu_theme}</li>
                <li>{menu.description}</li>
                <li>{menu.prix_unitaire}</li>
                <li></li>
                <li></li>
              </ul>
            </CardContent>
          </Card>
        ))}
        ;
      </div>
    </div>
  );
};
export default MenuGlobale;
