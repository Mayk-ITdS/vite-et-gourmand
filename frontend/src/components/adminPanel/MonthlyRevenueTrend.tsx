import { useAppSelector } from "@/store/hooks";
import { LineChart } from "@mui/x-charts/LineChart";
import { useMemo } from "react";

const RevenueTrendChart = () => {
  const data = useAppSelector((state) => state.adminAnalytics.data);

  const revenueSeries = useMemo(() => {
    if (!data?.months) return [];

    return data.months.map((m) => m.totalRevenue);
  }, [data]);

  const xLabels = useMemo(() => {
    if (!data?.months) return [];

    return data.months.map((m) => `${m.month}/${m.year.toString().slice(-2)}`);
  }, [data]);

  if (!revenueSeries.length) return null;

  return (
    <div className="bg-[#1f2937] p-6 rounded-xl border border-white/10">
      <h3 className="text-sm text-gray-400 mb-4">Monthly Revenue</h3>

      <LineChart
        xAxis={[{ scaleType: "point", data: xLabels }]}
        series={[
          {
            data: revenueSeries,
            color: "#c4a07a",
            area: true,
          },
        ]}
        height={320}
        sx={{
          "& .MuiLineElement-root": {
            strokeWidth: 2.2,
          },
        }}
      />
    </div>
  );
};

export default RevenueTrendChart;
