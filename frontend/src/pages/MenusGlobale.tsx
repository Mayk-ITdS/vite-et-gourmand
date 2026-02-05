import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { glassCard } from "./MentionsLegales";
import { sections } from "@/lib/mockData";
import { useEffect, useState } from "react";
import type { FiltersState } from "@/types/menus";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMenus } from "@/store/menus/menusSlice";
import tommaso from "@/assets/tommaso-ubezio-dish.jpg";
import restaurant from "@/assets/valentin-kremer-S8BhJ0HB-WQ-unsplash.jpg";
import { cn } from "@/lib/utils";
const MenuGlobale = () => {
  const [showFilters, setShowFilters] = useState(false);

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
    <div className="w-full flex flex-col">
      {!showFilters && (
        <div className="md:hidden p-4 flex justify-end w-full">
          <button
            onClick={() => setShowFilters(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg shadow-md"
          >
            Filtres
          </button>
        </div>
      )}

      <div
        style={{ backgroundImage: `url(${restaurant})` }}
        className="flex h-full"
      >
        <aside
          className={cn(
            "fixed overflow:scroll inset-y-0 left-0 w-full backdrop-blur-xl shadow-xl z-50 transform transition-transform duration-300",
            showFilters ? "translate-x-0" : "-translate-x-full",
            "md:relative sm:h-sm md:translate-x-0 md:w-md md:max-w-none",
          )}
        >
          <div className="flex justify-between items-center p-4 md:hidden">
            <h2 className="text-lg font-bold">Filtres</h2>
            <button
              onClick={() => setShowFilters(false)}
              className="text-xl font-bold"
            >
              ✕
            </button>
          </div>

          <div className="p-4">
            {sections.map((s) => (
              <section key={s.id}>
                <Card className={cn(glassCard, "mb-4")}>
                  <CardTitle>{s.label}</CardTitle>
                  <CardContent>{s.render(filters, setFilters)}</CardContent>
                </Card>
              </section>
            ))}
          </div>
        </aside>
        <div className="flex-1 h-full px-6 mt-4 grid mb-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 auto-rows-[(minmax(450px,auto))] gap-6">
          {Object.entries(filters).map(([key, _value]) => (
            <div
              key={key}
              style={{ backgroundImage: `url(${tommaso})` }}
              className={cn(
                "h-full w-full bg-contain bg-no-repeat bg-center rounded-xl shadow-xl",
                "transform hover:scale-105 transition-transform duration-300 cursor-pointer",
              )}
            >
              <Card className="h-full bg-white/25 backdrop-blur-s border text-white border-white/30 rounded-xl">
                <CardTitle className="mx-auto my-6">Menu</CardTitle>
                <CardContent className="transform translate-y-[0%]">
                  <div className="flex md:w-full w-full items-center justify-center rounded-md h-50 md:h:70 bg-background/30">
                    Menu swiateczne, losos, margaryna kasia i czarna polewka
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MenuGlobale;
