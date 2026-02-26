import { useAppSelector } from "@/store/hooks";
import { KPI } from "./KPICard";
import {
  selectAverageRevenue,
  selectTotalOrders,
  selectTotalRevenue,
} from "@/store/slices/adminSelectors";

export default function OverviewStats() {
  const revenue = useAppSelector(selectTotalRevenue);
  const orders = useAppSelector(selectTotalOrders);
  const average = useAppSelector(selectAverageRevenue);

  return (
    <div className="grid md:grid-cols-4 gap-6">
      <KPI label="Total Revenue" value={`${revenue.toLocaleString()} €`} />
      <KPI label="Total Orders" value={orders.toString()} />
      <KPI label="Avg Revenue / Order" value={`${average.toFixed(2)} €`} />
      <KPI label="Top Menu ID" value="— dynamic later —" />
    </div>
  );
}
