import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const KPI = ({ label, value }: { label: string; value: string }) => {
  return (
    <Paper variant="glass" sx={{ p: 4, borderRadius: 4 }}>
      <Typography variant="caption" sx={{ letterSpacing: 1.2, opacity: 0.6 }}>
        {label}
      </Typography>

      <Typography variant="h4" sx={{ mt: 2, fontWeight: 500 }}>
        {value}
      </Typography>
    </Paper>
  );
};
