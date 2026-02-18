import { Paper, Typography, Divider } from "@mui/material";

import { selectOrderPricing } from "@/store/orders/selectors";
import { useAppSelector } from "@/store/hooks";

export default function OrderSidebarSummary() {
  const pricing = useAppSelector(selectOrderPricing);

  return (
    <Paper className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
      <Typography variant="h6">Résumé</Typography>

      <Divider className="my-4" />

      <Typography>Base: {pricing.base.toFixed(2)} €</Typography>
      <Typography>Remise: -{pricing.discountEligible} €</Typography>
      <Typography>Livraison: {pricing.delivery.toFixed(2)} €</Typography>

      <Divider className="my-4" />

      <Typography>HT: {pricing.ht.toFixed(2)} €</Typography>
      <Typography>TVA (10%): {pricing.tva.toFixed(2)} €</Typography>

      <Typography className="mt-4 text-xl font-bold">
        TTC: {pricing.ttc.toFixed(2)} €
      </Typography>
    </Paper>
  );
}
