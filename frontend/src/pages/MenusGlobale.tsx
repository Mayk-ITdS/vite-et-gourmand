import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { sections } from "@/lib/mockData";
import { themeValues, type FiltersState, type ThemeValue } from "@/types/menus";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMenus } from "@/store/menus/menusSlice";
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
  const status = useAppSelector((state) => state.menus.list.status);
  const error = useAppSelector((state) => state.menus.list.error);

  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchMenus());
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
  const filteredMenus = useAppSelector((state) => selectFilteredMenus(state, filters));
  const quickThemes = themeValues.slice(0, 4);

  const activeFilterCount = useMemo(() => {
    return [
      filters.themes.length,
      filters.regime.length,
      filters.priceMin ? 1 : 0,
      filters.priceMax ? 1 : 0,
      filters.rangePeople?.length ? 1 : 0,
    ].reduce((sum, value) => sum + value, 0);
  }, [filters]);

  const toggleTheme = (theme: ThemeValue) => {
    setFilters((prev) => {
      const nextThemes = prev.themes.includes(theme)
        ? prev.themes.filter((value) => value !== theme)
        : [...prev.themes, theme];

      return {
        ...prev,
        themes: nextThemes,
      };
    });
  };

  const resetFilters = () => {
    setFilters({
      priceMax: 0,
      priceMin: 0,
      priceRangeMax: 0,
      themes: [],
      regime: [],
      minPeople: 2,
      maxPeople: 100,
      rangePeople: [],
    });
  };

  if (status === "loading") {
    return (
      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="hidden xl:block h-[720px] animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.04]" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-[360px] animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.04]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return <p className="text-sm text-red-300">Erreur : {error}</p>;
  }

  if (!data.length) {
    return <p className="text-sm text-white/60">Aucun menu disponible.</p>;
  }

  return (
    <div className="w-full space-y-8">
      <section className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(19,22,29,0.98),rgba(10,12,17,0.94))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.32)] md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(166,61,89,0.22),transparent_26%),radial-gradient(circle_at_10%_10%,rgba(229,197,125,0.08),transparent_22%)]" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.72rem] uppercase tracking-[0.32em] text-white/55">
              <Sparkles className="h-4 w-4 text-[#e5c57d]" />
              Nos menus
            </div>

            <h1 className="font-display text-4xl text-[#f8f1ea] md:text-6xl">
              Une galerie hi-fi pour choisir votre mise en scene culinaire.
            </h1>

            <p className="max-w-2xl text-sm leading-7 text-white/58 md:text-base">
              Filtrez par theme, regime et nombre de convives, puis comparez les cartes
              comme dans la maquette hi-fi: images hero, prix lisibles et appels a
              l’action compacts.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/55">
            <Search className="h-4 w-4 text-[#e5c57d]" />
            {filteredMenus.length} menus visibles
          </div>
        </div>

        <div className="relative mt-6 flex flex-wrap gap-3">
          {quickThemes.map((theme) => {
            const selected = filters.themes.includes(theme);

            return (
              <button
                key={theme}
                type="button"
                onClick={() => toggleTheme(theme)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition",
                  selected
                    ? "border-[#a43c57] bg-[#8d314b]/85 text-white"
                    : "border-white/10 bg-white/[0.04] text-white/62 hover:bg-white/[0.08] hover:text-white",
                )}
              >
                {theme}
              </button>
            );
          })}
        </div>
      </section>

      <div className="w-full flex flex-col">
        {!showFilters && (
          <div className="md:hidden flex justify-end w-full">
            <button
              onClick={() => setShowFilters(true)}
              className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#a43c57,#742b3f)] px-5 py-3 text-sm font-semibold text-white shadow-[0_22px_45px_rgba(116,43,63,0.34)] md:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtres
            </button>
          </div>
        )}

        <div className="flex h-full w-full gap-6 xl:flex-row xl:items-start">
          {showFilters && (
            <div
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
          )}
          <aside
            className={cn(
              "fixed inset-y-0 left-0 z-50 w-full transform transition-transform duration-300",
              showFilters && "h-[100dvh] overflow-y-auto py-20 no-scrollbar",
              showFilters
                ? "translate-x-0 h-[100dvh] overflow-y-auto no-scrollbar"
                : "-translate-x-full",

              "xl:relative xl:translate-x-0 xl:w-[320px]",
              "xl:sticky xl:top-28 xl:self-start",
              "xl:h-[calc(100vh-9rem)]",
              "xl:overflow-y-auto xl:no-scrollbar",
              "overscroll-contain",

              "rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,20,26,0.98),rgba(11,13,18,0.96))] shadow-[0_28px_70px_rgba(0,0,0,0.35)]",
            )}
          >
            <div className="flex items-center justify-between border-b border-white/10 p-5 xl:hidden">
              <h2 className="text-lg font-semibold text-white">Filtres</h2>
              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white/70"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5">
              <div className="mb-5 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
                <p className="text-[0.72rem] uppercase tracking-[0.32em] text-white/34">
                  Filtres actifs
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {activeFilterCount}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/52">
                  Ajustez le catalogue selon votre ambiance, votre budget et votre jauge.
                </p>
              </div>

              {sections.map((s) => (
                <section key={s.id}>
                  <div className="mb-5 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition hover:border-white/16">
                    <h3 className="mb-4 border-b border-white/10 pb-3 text-[0.72rem] uppercase tracking-[0.32em] text-white/42">
                      {s.label}
                    </h3>
                    {s.render(filters, setFilters)}
                  </div>
                </section>
              ))}
            </div>

            <div className="flex flex-col gap-3 px-5 pb-5">
              <Button
                type="button"
                variant="secondary"
                onClick={resetFilters}
                className="h-12 rounded-full border border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.1]"
              >
                Réinitialiser
              </Button>

              <Button
                type="button"
                onClick={() => setShowFilters(false)}
                className="h-12 rounded-full bg-[linear-gradient(135deg,#a43c57,#742b3f)] text-white shadow-[0_18px_40px_rgba(116,43,63,0.34)] hover:opacity-95"
              >
                Appliquer les filtres
              </Button>
            </div>
          </aside>
          <div className="min-w-0 flex-1 space-y-5">
            <div className="flex flex-col gap-3 rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 text-sm text-white/60 shadow-[0_18px_45px_rgba(0,0,0,0.2)] md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.32em] text-white/34">
                  Catalogue filtre
                </p>
                <p className="mt-2 text-base text-white">
                  {filteredMenus.length} menu{filteredMenus.length > 1 ? "s" : ""} pour
                  votre scenographie.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-white/55">
                <SlidersHorizontal className="h-4 w-4 text-[#e5c57d]" />
                Hi-fi only
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
              {filteredMenus.map((menu) => {
                const description =
                  menu.description.length > 132
                    ? `${menu.description.slice(0, 132)}...`
                    : menu.description;

                return (
                  <article
                    key={menu.menu_id}
                    className="group overflow-hidden rounded-[1.85rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,21,27,0.98),rgba(11,13,18,0.96))] shadow-[0_24px_60px_rgba(0,0,0,0.28)] transition hover:-translate-y-1.5 hover:border-white/18"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={menu.image_url}
                        alt={menu.menu_name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,14,0.08),rgba(7,9,14,0.76))]" />
                      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                        {menu.themes.slice(0, 2).map((theme) => (
                          <span
                            key={theme}
                            className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-white/72 backdrop-blur"
                          >
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4 p-5">
                      <div className="space-y-2">
                        <h2 className="font-display text-3xl leading-none text-white">
                          {menu.menu_name}
                        </h2>
                        <p className="text-sm leading-6 text-white/58">{description}</p>
                      </div>

                      <div className="flex items-center justify-between rounded-[1.35rem] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/65">
                        <span>{menu.min_persons} convives min.</span>
                        <span className="font-semibold text-[#e5c57d]">
                          {Number(menu.prix_unitaire).toFixed(0)} € / pers.
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm uppercase tracking-[0.24em] text-white/34">
                          {menu.diet_type}
                        </span>
                        <Link
                          to={`/menus/${menu.menu_id}`}
                          className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#a43c57,#742b3f)] px-4 py-2 text-sm font-semibold text-white shadow-[0_16px_38px_rgba(116,43,63,0.3)] transition hover:opacity-95"
                        >
                          Voir le menu
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MenuGlobale;
