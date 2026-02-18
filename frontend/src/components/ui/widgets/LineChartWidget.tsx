import { LineChart } from "@mui/x-charts/LineChart";

import {
  worldElectricityProduction,
  keyToLabel,
  colors,
} from "@/lib/dumbLineData";

const stackStrategy = {
  stack: "total",
  area: true,
  stackOffset: "none",
} as const;

const customize = {
  height: 350,
  hideLegend: true,
  experimentalFeatures: { preferStrictDomainInLineCharts: true },
};

export default function LineChartWidget() {
  return (
    <LineChart
      xAxis={[
        {
          dataKey: "year",
          valueFormatter: (value: number) => value.toString(),
        },
      ]}
      yAxis={[{ width: 50 }]}
      series={Object.keys(keyToLabel).map((key) => ({
        dataKey: key,
        label: keyToLabel[key],
        color: colors[key],
        showMark: false,
        ...stackStrategy,
      }))}
      dataset={worldElectricityProduction}
      {...customize}
    />
  );
}
