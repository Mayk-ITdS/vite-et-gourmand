import { cn } from "@/lib/utils";
import * as React from "react";

type HambourgerButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  open: boolean;
};

export const HambourgerButton = React.forwardRef<
  HTMLButtonElement,
  HambourgerButtonProps
>(({ open, className, ...props }, ref) => {
  const base =
    "pointer-events-none absolute left-1/2 h-0.5 w-6 -translate-x-1/2 bg-current transition-all duration-300";
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      className={cn("relative h-10 w-10", className)}
      {...props}
    >
      <span
        className={`${base} ${
          open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-3"
        }`}
      />
      <span
        className={`${base} absolute top-1/2 -translate-y-1/2 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`${base} ${
          open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-3"
        }`}
      />
    </button>
  );
});
