import { KPI } from "./KPICard";
type OverviewStatsProps = {
  totalRevenue: number;
  totalOrders: number;
  averageRevenue: number;
  topMenuLabel: string;
};

const OverviewStats = ({
  totalRevenue,
  totalOrders,
  averageRevenue,
  topMenuLabel,
}: OverviewStatsProps) => {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      <KPI label="Total Revenue" value={`${totalRevenue?.toLocaleString()} €`} />
      <KPI label="Total Orders" value={`${totalOrders}`} />
      <KPI label="Avg Revenue / Order" value={`${averageRevenue.toFixed(2)} €`} />
      <KPI label="Top Menu ID" value={topMenuLabel} />
    </div>
  );
};
export default OverviewStats;
