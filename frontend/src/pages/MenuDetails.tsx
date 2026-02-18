import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setStep, startOrderFromMenu } from "@/store/orders/orderSlice";
import { selectMenuById } from "@/store/menus/selectors";
import { clearMenuDetails, fetchMenuById } from "@/store/menus/menusSlice";

const MenuDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const menu = useAppSelector((state) => selectMenuById(state, Number(id)));
  const menuId = Number(id);
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();
  const detailsStatus = useAppSelector((state) => state.menus.details.status);

  useAppSelector((state) => state.menus.list.data);
  useEffect(() => {
    if (menuId) {
      dispatch(fetchMenuById(menuId));
    }

    return () => {
      dispatch(clearMenuDetails());
    };
  }, [dispatch, menuId]);

  useEffect(() => {
    if (!menu?.images?.length) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === menu.images.length - 1 ? 0 : prev + 1,
      );
    }, 4500);
    return () => clearInterval(interval);
  }, [menu?.images]);
  function handleAddToCart() {
    if (!menu) return;
    dispatch(startOrderFromMenu(menu));
    dispatch(setStep(0));
    navigate("/orders");
  }

  if (detailsStatus === "loading") {
    return <p>Chargement du menu...</p>;
  }

  if (detailsStatus === "failed") {
    return <p>Menu introuvable ou erreur du serveur</p>;
  }

  if (!menu) return <p>Chargement du menu...</p>;

  return (
    <div className="min-h-screen text-white">
      <section className="relative h-[70vh] w-full overflow-hidden bg-black/80">
        <img
          src={menu.images?.[currentImage] || menu.image_url}
          alt={menu.menu_name}
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute bottom-16 left-12 text-white space-y-3">
          <h1 className="text-5xl uppercase font-thin tracking-wider">
            {menu.menu_name}
          </h1>
          <p className="max-w-2xl text-lg text-white/80">{menu.description}</p>
        </div>
      </section>
      <div className="mt-8 flex justify-center gap-4">
        {menu.images.map((img: string, idx: number) => (
          <img
            key={idx}
            src={img}
            onClick={() => setCurrentImage(idx)}
            className={`w-36 h-24 cursor-pointer object-cover rounded-lg transition-all duration-300 ${
              currentImage === idx
                ? "ring-2 ring-[#d4af37]"
                : "opacity-70 hover:opacity-100"
            }`}
          />
        ))}
      </div>
      <div className="fixed bottom-10 right-10 z-50">
        <Button
          onClick={handleAddToCart}
          sx={{
            backgroundColor: "#facc15",
            color: "black",
            px: 4,
            py: 2,
            fontWeight: "bold",
            borderRadius: "2rem",
            boxShadow: "0 0 20px rgba(250,204,21,0.6)",
            "&:hover": {
              backgroundColor: "#fde047",
              boxShadow: "0 0 30px rgba(250,204,21,0.9)",
            },
          }}
          startIcon={<ShoppingCart />}
        >
          ADD TO CART
        </Button>
      </div>

      <div className="max-w-6xl mx-auto py-16 px-6 space-y-12">
        <div className="grid md:grid-cols-3 gap-10 border-b border-[#d4af37]/30 pb-10">
          <div>
            <p className="text-sm uppercase tracking-widest text-[#d4af37]">
              Thème
            </p>
            <p className="text-xl mt-2">{menu.themes.join(", ")}</p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-widest text-[#d4af37]">
              Régime
            </p>
            <p className="text-xl mt-2">{menu.diet_type}</p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-widest text-[#d4af37]">
              Minimum personnes
            </p>
            <p className="text-xl mt-2">{menu.min_persons} personnes</p>
          </div>
        </div>

        <div className="flex justify-between border-b border-[#d4af37]/30 pb-10">
          <div>
            <p className="text-4xl font-light">{menu.prix_unitaire} €</p>
            <p className="text-white/70 text-lg">
              a partir de {menu.min_persons} personnes
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm uppercase text-[#d4af37]">Stock disponible</p>
            <p className="text-xl mt-2">{menu.quantity_in_stock} commandes</p>
          </div>
        </div>
        <section>
          <h2 className="text-3xl uppercase tracking-wide text-[#d4af37] mb-8">
            Menu Composition
          </h2>

          {["starter", "main", "dessert"].map((type) => (
            <div key={type} className="mb-8">
              <h3 className="text-xl mb-4 uppercase">{type}</h3>

              {menu.items
                ?.filter((i) => i.item_type === type)
                .map((i) => (
                  <div
                    key={i.item_id}
                    className="flex justify-between border-b border-white/20 py-3"
                  >
                    <div>
                      <p className="text-lg">{i.item_name}</p>
                      <p className="text-white/60 text-sm">
                        {i.diet_type} • Préparation {i.min_preparation_time}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </section>
        <section>
          <h2 className="text-2xl uppercase tracking-widest text-[#d4af37] mb-6">
            Order the latest
          </h2>
          <p className="text-white/70">
            Preorder{" "}
            {Object.entries(menu.order_lead_time)
              .splice(0, 1)
              .toLocaleString()
              .slice(6)}
            h before
          </p>
        </section>
      </div>
    </div>
  );
};

export default MenuDetails;
