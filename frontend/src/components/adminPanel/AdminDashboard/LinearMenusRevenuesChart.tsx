import { useMemo } from "react";
import type { MonthStat } from "@/types/adminAnalTypes";

const currency = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const getMonthLabel = (month: number) => {
  if (!month) return "—";

  return new Intl.DateTimeFormat("fr-FR", {
    month: "short",
  }).format(new Date(2026, month - 1, 1));
};
type MonthlyChartProps = {
  data: MonthStat[];
};
const MonthlyRevenueChart = ({ data }: MonthlyChartProps) => {
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      }

      return a.month - b.month;
    });
  }, [data]);

  if (!sortedData.length) {
    return (
      <div className="flex h-72 items-center justify-center rounded-2xl border border-white/10 bg-slate-950 text-sm text-slate-500">
        Aucune donnée mensuelle disponible.
      </div>
    );
  }

  const width = 720;
  const height = 300;

  const padding = {
    top: 34,
    right: 28,
    bottom: 56,
    left: 78,
  };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxRevenue = Math.max(
    ...sortedData.map((item) => Number(item.totalRevenue ?? 0)),
    1,
  );

  const points = sortedData.map((item, index) => {
    const revenue = Number(item.totalRevenue ?? 0);

    const x =
      sortedData.length === 1
        ? padding.left + chartWidth / 2
        : padding.left + (index / (sortedData.length - 1)) * chartWidth;

    const y = padding.top + chartHeight - (revenue / maxRevenue) * chartHeight;

    return {
      ...item,
      revenue,
      x,
      y,
    };
  });

  const linePath = points
    .map((point, index) =>
      index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`,
    )
    .join(" ");

  const baselineY = padding.top + chartHeight;

  const areaPath =
    points.length > 1
      ? `${linePath} L ${points[points.length - 1].x} ${baselineY} L ${points[0].x} ${baselineY} Z`
      : "";

  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-xl">
      <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-semibold text-white">Revenus mensuels</h2>
          <p className="text-sm text-slate-400">
            Évolution consolidée du chiffre d’affaires.
          </p>
        </div>

        <div className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-slate-400">
          {sortedData.length} périodes
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-80 min-w-[640px] w-full"
          role="img"
          aria-label="Graphique des revenus mensuels"
        >
          {gridLines.map((ratio) => {
            const y = padding.top + chartHeight - ratio * chartHeight;
            const value = Math.round(maxRevenue * ratio);

            return (
              <g key={ratio}>
                <line
                  x1={padding.left}
                  x2={width - padding.right}
                  y1={y}
                  y2={y}
                  stroke="rgba(255,255,255,0.08)"
                />

                <text
                  x={padding.left - 14}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-slate-500 text-[11px]"
                >
                  {currency.format(value)}
                </text>
              </g>
            );
          })}

          {areaPath && (
            <path
              d={areaPath}
              fill="rgba(251, 191, 36, 0.10)"
            />
          )}

          <path
            d={linePath}
            fill="none"
            stroke="rgb(251, 191, 36)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((point, index) => (
            <g key={`${point.year}-${point.month}-${index}`}>
              <title>
                {getMonthLabel(point.month)} {point.year} —{" "}
                {currency.format(point.revenue)}
              </title>

              <circle
                cx={point.x}
                cy={point.y}
                r="5"
                fill="rgb(251, 191, 36)"
                stroke="#070c14"
                strokeWidth="3"
              />

              <text
                x={point.x}
                y={point.y - 12}
                textAnchor="middle"
                className="fill-amber-200 text-[11px] font-medium"
              >
                {currency.format(point.revenue)}
              </text>

              <text
                x={point.x}
                y={height - 26}
                textAnchor="middle"
                className="fill-slate-400 text-[12px]"
              >
                {getMonthLabel(point.month)}
              </text>

              <text
                x={point.x}
                y={height - 10}
                textAnchor="middle"
                className="fill-slate-600 text-[10px]"
              >
                {point.year}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default MonthlyRevenueChart;
