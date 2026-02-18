import { RadarChart } from "@mui/x-charts/RadarChart";

function valueFormatter(v: number | null) {
  if (v === null) {
    return "NaN";
  }
  return `${v.toLocaleString()}t CO2eq/pers`;
}

export default function RadarPlotWidget() {
  return (
    <RadarChart
      height={300}
      series={[
        {
          label: "USA",
          data: [6.65, 2.76, 5.15, 0.19, 0.07, 0.12],
          valueFormatter,
        },
        {
          label: "Australia",
          data: [5.52, 5.5, 3.19, 0.51, 0.15, 0.11],
          valueFormatter,
        },
        {
          label: "United Kingdom",
          data: [2.26, 0.29, 2.03, 0.05, 0.04, 0.06],
          valueFormatter,
        },
      ]}
      radar={{
        metrics: ["Oil", "Coal", "Gas", "Flaring", "Other\nindustry", "Cement"],
      }}
    />
  );
}
