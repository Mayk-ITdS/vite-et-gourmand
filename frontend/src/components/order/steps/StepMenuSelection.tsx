import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPersons, setStep } from "@/store/orders/orderSlice";

export default function StepMenuSelection() {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.orders);

  const menu = order.selectedMenu;

  if (!menu) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="text-xl font-semibold text-white">{menu.menu_name}</div>

        {menu.image_url && (
          <img
            src={menu.image_url}
            alt={menu.menu_name}
            className="
              w-56 h-36
              object-cover
              rounded-2xl
              border border-white/20
              shadow-lg
            "
          />
        )}

        <div className="text-white/80 text-sm">
          Prix par personne :{" "}
          <span className="text-yellow-400 font-medium">
            {order.order.unitPrice.toFixed(2)} €
          </span>
        </div>

        <div className="text-white/80 text-sm">
          Minimum : {order.order.minPersons} personnes
        </div>
      </div>
      <TextField
        label="Nombre de personnes"
        type="number"
        fullWidth
        value={order.order.persons}
        inputProps={{
          min: order.order.minPersons,
        }}
        onChange={(e) => dispatch(setPersons(Number(e.target.value)))}
      />

      <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-white/80 text-sm">
          <span>Total HT</span>
          <span>{order.pricing.ht.toFixed(2)} €</span>
        </div>

        <div className="flex justify-between text-white/80 text-sm">
          <span>TVA (10%)</span>
          <span>{order.pricing.tva.toFixed(2)} €</span>
        </div>

        <div className="flex justify-between text-yellow-400 font-semibold">
          <span>Total TTC</span>
          <span>{order.pricing.ttc.toFixed(2)} €</span>
        </div>
      </div>
      <Button
        onClick={() => dispatch(setStep(3))}
        className="
          w-full mt-4
          bg-white/10
          backdrop-blur-md
          border border-white/20
          text-white
          hover:bg-white/20
          transition-all duration-300
        "
      >
        Continuer
      </Button>
    </div>
  );
}
