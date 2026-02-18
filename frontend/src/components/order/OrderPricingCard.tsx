import { useAppSelector } from "@/store/hooks";

export default function OrderPricingCard() {
  const step = useAppSelector((state) => state.orders.step);
  const pricing = useAppSelector((s) => s.orders.pricing);

  if (step < 2) return null;

  return (
    <div className="sticky top-24 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 space-y-4">
      <h3 className="text-xl font-semibold text-[#D4AF37]">Détail du prix</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Base</span>
          <span>{pricing.base} €</span>
        </div>

        <div className="flex justify-between text-green-400">
          <span>Réduction</span>
          <span>- {pricing.discount} €</span>
        </div>

        <div className="flex justify-between">
          <span>Livraison</span>
          <span>{pricing.delivery} €</span>
        </div>

        <div className="border-t border-white/10 pt-3 flex justify-between font-semibold">
          <span>Total TTC</span>
          <span className="text-lg text-[#D4AF37]">{pricing.ttc} €</span>
        </div>
      </div>
    </div>
  );
}
