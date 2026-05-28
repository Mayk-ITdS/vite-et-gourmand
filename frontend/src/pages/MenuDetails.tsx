import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Clock3, ShoppingBasket, Sparkles, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setStep, startOrderFromMenu } from "@/store/orders/orderSlice";
import { selectMenuDetails } from "@/store/menus/selectors";
import { clearMenuDetails, fetchMenuById } from "@/store/menus/menusSlice";

const MenuDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const menu = useAppSelector(selectMenuDetails);
  const menuId = Number(id);
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();
  const detailsStatus = useAppSelector((state) => state.menus.details.status);
  const preorderLeadTime =
    typeof menu?.order_lead_time === "string" ? menu.order_lead_time.split(":")[0] : null;
  const stockLabel =
    menu?.quantity_in_stock == null
      ? "Sur demande"
      : `${menu.quantity_in_stock} commandes`;
  const gallery = menu?.images?.length
    ? menu.images
    : menu?.image_url
      ? [menu.image_url]
      : [];

  const groupedItems = useMemo(
    () => [
      {
        label: "Entrees",
        items: menu?.items?.filter((item) => item.item_type === "starter") ?? [],
      },
      {
        label: "Plats",
        items: menu?.items?.filter((item) => item.item_type === "main") ?? [],
      },
      {
        label: "Desserts",
        items: menu?.items?.filter((item) => item.item_type === "dessert") ?? [],
      },
    ],
    [menu?.items],
  );

  useEffect(() => {
    if (menuId) {
      void dispatch(fetchMenuById(menuId));
    }

    return () => {
      void dispatch(clearMenuDetails());
    };
  }, [dispatch, menuId]);

  useEffect(() => {
    if (!menu?.images?.length) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === menu.images.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [menu?.images]);

  function handleAddToCart() {
    if (!menu) return;
    void dispatch(startOrderFromMenu(menu));
    void dispatch(setStep(0));
    void navigate("/orders");
  }

  if (detailsStatus === "loading") {
    return <p>Chargement du menu...</p>;
  }

  if (detailsStatus === "failed") {
    return <p>Menu introuvable ou erreur du serveur</p>;
  }

  if (!menu) return <p>Chargement du menu...</p>;

  return (
    <div className="space-y-6 py-2">
      <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
        <Button
          type="button"
          onClick={handleAddToCart}
          className="h-12 rounded-full bg-[linear-gradient(135deg,#a43c57,#742b3f)] px-6 text-white shadow-[0_18px_40px_rgba(116,43,63,0.36)] hover:opacity-95"
        >
          <ShoppingBasket className="mr-2 h-4 w-4" />
          Réserver
        </Button>
      </div>

      <Link
        to="/menus"
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/76 transition hover:bg-white/[0.08] hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux menus
      </Link>

      <section className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
        <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,20,26,0.98),rgba(10,12,17,0.96))] shadow-[0_30px_80px_rgba(0,0,0,0.32)]">
          <div className="relative aspect-[5/4] overflow-hidden">
            <img
              src={gallery[currentImage] || menu.image_url}
              alt={menu.menu_name}
              className="h-full w-full object-cover transition duration-700"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,15,0.15),rgba(8,10,15,0.64))]" />
          </div>

          <div className="grid gap-3 border-t border-white/10 p-5 sm:grid-cols-4">
            {gallery.map((img, idx) => (
              <button
                key={`${img}-${idx}`}
                type="button"
                onClick={() => setCurrentImage(idx)}
                className={cn(
                  "overflow-hidden rounded-[1rem] border transition",
                  currentImage === idx
                    ? "border-[#e5c57d] shadow-[0_0_0_1px_rgba(229,197,125,0.45)]"
                    : "border-white/10 opacity-70 hover:opacity-100",
                )}
              >
                <img
                  src={img}
                  alt={`${menu.menu_name} ${idx + 1}`}
                  className="h-20 w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <aside className="rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,20,26,0.98),rgba(10,12,17,0.96))] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.32)] md:p-8">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-[#e5c57d]/20 bg-[#e5c57d]/10 px-3 py-1 text-[0.72rem] uppercase tracking-[0.32em] text-[#efd799]">
              Detail menu
            </span>
            <Sparkles className="h-5 w-5 text-[#e5c57d]" />
          </div>

          <h1 className="mt-5 font-display text-4xl text-[#f8f1ea] md:text-5xl">
            {menu.menu_name}
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/62 md:text-base">
            {menu.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {menu.themes.map((theme) => (
              <span
                key={theme}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/70"
              >
                {theme}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
              <p className="text-[0.72rem] uppercase tracking-[0.3em] text-white/34">
                Tarif
              </p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {Number(menu.prix_unitaire).toFixed(0)} €
              </p>
              <p className="mt-1 text-sm text-white/54">par personne</p>
            </div>

            <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
              <p className="text-[0.72rem] uppercase tracking-[0.3em] text-white/34">
                Capacite
              </p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {menu.min_persons}+
              </p>
              <p className="mt-1 text-sm text-white/54">convives minimum</p>
            </div>
          </div>

          <div className="mt-8 space-y-3 rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5 text-sm text-white/68">
            <div className="flex items-center gap-3">
              <Users className="h-4 w-4 text-[#e5c57d]" />
              {menu.min_persons} convives minimum
            </div>
            <div className="flex items-center gap-3">
              <Clock3 className="h-4 w-4 text-[#e5c57d]" />
              {preorderLeadTime
                ? `Précommande ${preorderLeadTime} h avant`
                : "Précommande sur demande"}
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-4 w-4 text-[#e5c57d]" />
              Stock: {stockLabel}
            </div>
          </div>

          <Button
            type="button"
            onClick={handleAddToCart}
            className="mt-8 h-12 w-full rounded-full bg-[linear-gradient(135deg,#a43c57,#742b3f)] text-white shadow-[0_18px_40px_rgba(116,43,63,0.36)] hover:opacity-95"
          >
            <ShoppingBasket className="mr-2 h-4 w-4" />
            Réserver ce menu
          </Button>
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.2)]">
          <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#e5c57d]">
            Thème
          </p>
          <p className="mt-3 text-lg text-white">{menu.themes.join(", ")}</p>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.2)]">
          <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#e5c57d]">
            Régime
          </p>
          <p className="mt-3 text-lg text-white">{menu.diet_type}</p>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.2)]">
          <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#e5c57d]">
            Minimum personnes
          </p>
          <p className="mt-3 text-lg text-white">{menu.min_persons} personnes</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,20,26,0.98),rgba(10,12,17,0.96))] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
          <h2 className="font-display text-4xl text-white">Composition du menu</h2>
          <div className="mt-6 space-y-6">
            {groupedItems.map((group) => (
              <div key={group.label}>
                <h3 className="text-[0.76rem] uppercase tracking-[0.34em] text-[#e5c57d]">
                  {group.label}
                </h3>

                <div className="mt-4 space-y-3">
                  {group.items.length ? (
                    group.items.map((item) => (
                      <div
                        key={item.item_id}
                        className="rounded-[1.3rem] border border-white/10 bg-white/[0.03] px-4 py-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-base font-medium text-white">
                              {item.item_name}
                            </p>
                            <p className="mt-1 text-sm text-white/52">
                              {item.diet_type} · Préparation {item.min_preparation_time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-white/42">Aucun élément renseigné.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,20,26,0.98),rgba(10,12,17,0.96))] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
          <h2 className="font-display text-4xl text-white">Points clés</h2>
          <div className="mt-6 space-y-4">
            {[
              `${menu.diet_type} pour une lecture immédiate du régime`,
              `${menu.themes.length} thème${menu.themes.length > 1 ? "s" : ""} disponible${menu.themes.length > 1 ? "s" : ""}`,
              `Commande disponible à partir de ${menu.min_persons} personnes`,
            ].map((line) => (
              <div
                key={line}
                className="flex items-start gap-3 rounded-[1.3rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-white/62"
              >
                <Check className="mt-1 h-4 w-4 shrink-0 text-[#e5c57d]" />
                {line}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,20,26,0.98),rgba(10,12,17,0.96))] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
        <p className="text-[0.72rem] uppercase tracking-[0.32em] text-[#e5c57d]">
          Précommande
        </p>
        <h2 className="mt-3 font-display text-4xl text-white">Order the latest</h2>
        <p className="mt-4 text-sm leading-7 text-white/58">
          {preorderLeadTime
            ? `Précommande ${preorderLeadTime} heures avant l'événement.`
            : "Précommande sur demande selon le format de prestation."}
        </p>
      </section>
    </div>
  );
};

export default MenuDetails;
