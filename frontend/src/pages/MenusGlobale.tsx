import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { sections } from "@/lib/mockData";
import type { FiltersState } from "@/types/menus";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMenus } from "@/store/menus/menusSlice";
import restaurant from "@/assets/valentin-kremer-S8BhJ0HB-WQ-unsplash.jpg";
import { cn } from "@/lib/utils";
import { selectFilteredMenus } from "@/store/menus/selectors";

const MenuGlobale = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FiltersState>({
    priceMax: 0,
    priceMin: 0,
    priceRangeMax: 0,
    themes: [],
    regime: [],
    minPeople: 2,
    maxPeople: 100,
    rangePeople: [],
  });
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.menus.details.status);
  const error = useAppSelector((state) => state.menus.details.error);
  useEffect(() => {
    console.log("FILTERS:", filters);
  }, [filters]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMenus());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showFilters]);

  const data = useAppSelector((state) => state.menus.list.data);
  const filteredMenus = useAppSelector((state) =>
    selectFilteredMenus(state, filters),
  );

  if (status === "loading") return <p>Chargement…</p>;
  if (status === "failed") return <p>Erreur : {error}</p>;
  if (!data.length) return <p>Aucun menu</p>;
  if (data.length === 0) return <p>Loading menus...</p>;

  return (
    <div className="w-full flex">
      <div className="w-full flex flex-col">
        {!showFilters && (
          <div className="md:hidden p-4 pb-22 flex justify-end w-full">
            <button
              onClick={() => setShowFilters(true)}
              className="
                  fixed bottom-6 right-6 
                  z-50 
                  px-5 py-3 
                  bg-[#b11226] 
                  text-white 
                  rounded-full 
                  shadow-lg 
                  md:hidden
                "
            >
              Filtres
            </button>
          </div>
        )}

        <div
          style={{ backgroundImage: `url(${restaurant})` }}
          className="flex h-full w-full bg-cover bg-center"
        >
          {showFilters && (
            <div
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
          )}
          <aside
            className={cn(
              "fixed inset-y-0 left-0 w-full z-50 transform transition-transform duration-300",
              showFilters && "h-screen py-24 md:py-0 overflow-y-auto",
              showFilters
                ? "translate-x-0 h-screen overflow-y-auto"
                : "-translate-x-full",

              "md:relative md:translate-x-0 md:w-[380px]",
              "md:sticky md:top-24 md:self-start",
              "md:h-[calc(100vh-8rem)]",
              "md:overflow-y-auto",

              "bg-gradient-to-b from-[#0c0c14] to-[#141420]",
              "border-r border-white/10",
              "shadow-[20px_0_60px_rgba(0,0,0,0.6)]",
            )}
          >
            <div className="p-4 border-b border-white/10 md:hidden flex justify-between items-center">
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
                  <Card
                    className={cn(
                      "mb-6 rounded-2xl",
                      "bg-white/5 backdrop-blur-xl",
                      "border border-white/10",
                      "shadow-[0_10px_40px_rgba(0,0,0,0.45)]",
                      "hover:border-primary/40 transition",
                    )}
                  >
                    <CardTitle className="uppercase text-xs tracking-[0.3em] text-white/60 border-b border-white/10 pb-3 mb-4">
                      {s.label}
                    </CardTitle>
                    <CardContent>{s.render(filters, setFilters)}</CardContent>
                  </Card>
                </section>
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-between px-14">
              <Button
                onClick={() =>
                  setFilters({
                    priceMax: 0,
                    priceMin: 0,
                    priceRangeMax: 0,
                    themes: [],
                    regime: [],
                    minPeople: 2,
                    maxPeople: 100,
                    rangePeople: [],
                  })
                }
                className="flex-1 border border-white/20 rounded-xl py-3 text-white/80 hover:bg-white/10 transition"
              >
                Button RESET
              </Button>
              <Button
                sx={{
                  backgroundColor: "black",
                  border: "1px solid blueviolet",
                  borderRadius: "8px",
                  paddingX: "2rem",
                }}
                onClick={() => setShowFilters(false)}
                className="flex-1 bg-primary rounded-xl py-3 text-white font-medium shadow-lg hover:opacity-90 transition"
              >
                BUTTON APPLY
              </Button>
            </div>
          </aside>
          <div className="flex-1 h-full px-6 mt-4 grid mb-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 auto-rows-[(minmax(450px,auto))] gap-6">
            {filteredMenus.map((menu) => (
              <div
                key={menu.menu_id}
                style={{ backgroundImage: `url(${menu.image_url})` }}
                className={cn(
                  "h-auto w-full bg-cover bg-no-repeat bg-center rounded-xl shadow-xl",
                  "transform hover:scale-105 transition-transform duration-300 cursor-pointer",
                )}
              >
                <Card className="h-full bg-black/25 backdrop-blur-s flex justify-between border text-white border-white/30 rounded-xl">
                  <CardTitle className="mx-auto my-6">
                    {menu.menu_name}
                  </CardTitle>

                  <CardContent className="transform translate-y-[0%]">
                    <div className="flex flex-col w-full gap-4 items-center justify-center rounded-md bg-black/50 py-2 px-3">
                      <Button
                        sx={{
                          border: "1px solid blueviolet",
                          borderRadius: "8px",
                          paddingX: "2rem",
                        }}
                        content="Order"
                      >
                        <Button component={Link} to={`/menus/${menu.menu_id}`}>
                          ORDER
                        </Button>
                      </Button>
                      <p className="text-sm text-center opacity-100 z-100">
                        {menu.description}
                      </p>
                      <div className="w-full flex flex-row justify-between">
                        <p>from {menu.min_persons} persons</p>
                        <p>prix: {menu.prix_unitaire}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MenuGlobale;
