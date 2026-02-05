import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { RegimeValue } from "@/types/menus";

type Props = {
  selected: boolean;
  diet: RegimeValue;
  onSelect?: (diet: RegimeValue) => void;
};

export function DietCircleButton({ selected, diet, onSelect }: Props) {
  const label = diet.toUpperCase();
  const ringText = `${label} • `.repeat(8);

  return (
    <button
      type="button"
      onClick={() => {
        onSelect?.(diet);
        toast(`Filtre mis à jour Tu as choisi : ${diet}.`);
      }}
      className={cn(
        "group relative h-16 w-16 rounded-full",
        "border border-border/60 bg-background/60 backdrop-blur-xl",
        "shadow-sm transition-all duration-300",
        "hover:-translate-y-[1px] hover:shadow-md",
        "hover:shadow-inner",
        "active:translate-y-0 active:shadow-inner",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        selected && "ring-2 ring-primary ring-offset-2 ring-offset-background",
      )}
      aria-pressed={selected}
    >
      <span
        className={cn(
          "absolute inset-0 grid place-items-center text-[10px] font-semibold tracking-wide",

          "bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-700 bg-clip-text text-transparent",
        )}
      >
        {label}
      </span>
      {/* Text circling :) */}
      <svg
        className="absolute inset-0"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <defs>
          <path
            id={`circle-${diet}`}
            d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          />
        </defs>

        <g
          className={cn(
            "origin-center transition-transform duration-300",
            "group-hover:rotate-16",
            selected && "rotate-40",
          )}
        >
          <text className="fill-current text-[9px] tracking-[0.25em] opacity-70">
            <textPath
              href={`#circle-${diet}`}
              startOffset="50%"
              textAnchor="middle"
            >
              {ringText}
            </textPath>
          </text>
        </g>
      </svg>
      <span className="pointer-events-none absolute inset-1 rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </button>
  );
}
