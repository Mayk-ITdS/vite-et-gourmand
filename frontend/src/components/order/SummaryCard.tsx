import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { postOrders } from "@/store/orders/orderSlice";
import { selectOrderPricing } from "@/store/orders/selectors";
import { SectionSurface } from "@/layouts/SectionSurface";
import PriceRow from "./PriceRow";
import { toClientError } from "@/store/funcs/toClientError";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function StepSummary() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const pricing = useAppSelector(selectOrderPricing);
  const { client, prestation, order, selectedMenu, status } = useAppSelector(
    (state) => state.orders,
  );
  if (!selectedMenu) {
    return "Menu n`a pas etait choisi";
  }
  const handleSubmitOrder = async () => {
    try {
      await dispatch(postOrders()).unwrap();
      navigate("/commande/confirmee");
    } catch (err) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      return toClientError(err);
    }
  };

  return (
    <SectionSurface>
      <div className="space-y-6 p-6 bg-[rgba(10,15,40,0.55)] backdrop-blur-lg rounded-xl">
        <div>
          <h3 className="text-sm text-white/60 mb-2">Client</h3>
          <p>
            {client.firstName} {client.lastName}
          </p>
          <p className="text-sm text-white/70">{client.email}</p>
          <p className="text-sm text-white/70">{client.phone}</p>
        </div>
        <div>
          <h3 className="text-sm text-white/60 mb-2">Événement</h3>
          {prestation.address && (
            <p>
              {prestation.address}, {prestation.city}
            </p>
          )}
          {prestation.date && (
            <p className="text-sm text-white/70">
              {`${prestation.date} à`} {prestation.time}
            </p>
          )}
        </div>
        <div>
          <h3 className="text-sm text-white/60 mb-2">Menu sélectionné</h3>
          <p>{selectedMenu?.menu_name}</p>
          <p className="text-sm text-white/70">
            {order.persons} personnes × {order.unitPrice} €
          </p>
        </div>
        <div className="border-t border-white/10 pt-4">
          <PriceRow label="Prix menu (HT)" value={pricing.ht} />
          <PriceRow label="TVA (10%)" value={pricing.tva} />
          <PriceRow label="Livraison" value={pricing.delivery} />

          <div className="my-3 border-t border-white/10" />

          <PriceRow label="TOTAL TTC" value={pricing.ttc} highlight />
        </div>
        <Button
          onClick={handleSubmitOrder}
          disabled={status === "loading"}
          className="
            w-full mt-4
            bg-yellow-500
            hover:bg-yellow-400
            text-black
            font-semibold
          "
        >
          {status === "loading" ? "Envoi..." : "Confirmer la commande"}
        </Button>
      </div>
    </SectionSurface>
  );
}
