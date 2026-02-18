import Box from "@mui/material/Box";
import type { ReactNode } from "react";

export const SectionSurface = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: `
      inset 0 1px 0 rgba(255,255,255,0.04),
      0 12px 32px rgba(0,0,0,0.35)
    `,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
        repeating-linear-gradient(
          45deg,
          rgba(255,255,255,0.015),
          rgba(255,255,255,0.015) 1px,
          transparent 1px,
          transparent 3px
        )
      `,
          opacity: 0.4,
        }}
      />

      <Box sx={{ position: "relative" }}>{children}</Box>
    </Box>
  );
};
