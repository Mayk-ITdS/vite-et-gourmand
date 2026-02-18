import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ClientOpinion } from "@/types/avis";

export default function AvisCard({ opinion }: { opinion: ClientOpinion }) {
  return (
    <Card
      className={cn(
        "min-h-10",
        "bg-white/10 backdrop-blur-xl",
        "border border-white/20",
        "rounded-xl",
        "transition-transform duration-300 hover:scale-[1.02]",
      )}
    >
      <CardContent className="p-6 flex flex-col gap-4 h-full">
        <div className="flex gap-3 text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
        </div>
        <span className="rounded-full">{opinion.avatar}</span>
        <p className="text-sm text-white leading-relaxed flex-1">
          “{opinion.content}”
        </p>

        <div className="pt-4 border-t border-white/10">
          <p className="font-medium text-white">{opinion.pseudo}</p>
          <p className="text-xs text-white text-muted-foreground">
            {opinion.createdAt.$date}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
