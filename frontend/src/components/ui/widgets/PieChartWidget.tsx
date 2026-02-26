import { PieChart } from "@mui/x-charts/PieChart";
import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";

function silverTone(index: number, total: number) {
  const phase = (index / total) * Math.PI * 6;
  const lightness = 55 + Math.sin(phase) * 18 + Math.cos(phase * 0.7) * 6;

  return `hsl(210, 8%, ${lightness}%)`;
}

function darkSilver(index: number, total: number) {
  const phase = (index / total) * Math.PI * 6;
  const lightness = 28 + Math.sin(phase) * 8;

  return `hsl(210, 10%, ${lightness}%)`;
}

export default function DiamondChart() {
  const { data } = useAppSelector((state) => state.adminAnalytics);

  const facets = useMemo(() => {
    if (!data?.menus?.length) return [];

    const total = data.menus.length;

    return data.menus.map((m, i) => ({
      id: m.menuId,
      value: m.timesOrdered || 1,
      label: `Menu ${m.menuId}`,
      color: silverTone(i, total),
    }));
  }, [data]);

  const outerFacets = useMemo(() => {
    if (!facets.length) return [];
    const total = facets.length;

    return facets.map((f, i) => ({
      ...f,
      color: darkSilver(i, total),
    }));
  }, [facets]);

  if (!facets.length) return null;

  return (
    <div className="bg-[#050b18] p-12 rounded-2xl relative">
      <PieChart
        height={520}
        series={[
          {
            data: facets,
            innerRadius: 0,
            outerRadius: 185,
            paddingAngle: 0,
            cornerRadius: 0,
            highlightScope: { highlight: "item", fade: "global" },
            highlighted: {
              additionalRadius: 18,
            },
          },

          {
            data: outerFacets,
            innerRadius: 195,
            outerRadius: 220,
            paddingAngle: 0,
            cornerRadius: 0,
            highlightScope: { highlight: "item", fade: "global" },
            highlighted: {
              color: "#e6edf5",
            },
          },
        ]}
        sx={{
          "& .MuiChartsArc-root": {
            stroke: "#050b18",
            strokeWidth: 0.6,
          },
        }}
      />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            background: `
        radial-gradient(circle at 30% 25%, rgba(255,255,255,0.15), transparent 40%),
        radial-gradient(circle at 70% 75%, rgba(255,255,255,0.08), transparent 50%)
      `,
            mixBlendMode: "screen",
          }}
        />
      </div>
    </div>
  );
}
