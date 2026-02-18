import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface PriceRowProps {
  label: string;
  value: number;
  highlight?: boolean;
}

export default function PriceRow({
  label,
  value,
  highlight = false,
}: PriceRowProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 1,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <Typography variant="body2" sx={{ opacity: highlight ? 1 : 0.7 }}>
        {label}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          fontWeight: highlight ? 700 : 400,
          color: highlight ? "#facc15" : "#f5f5f4",
        }}
      >
        {value.toFixed(2)} €
      </Typography>
    </Box>
  );
}
