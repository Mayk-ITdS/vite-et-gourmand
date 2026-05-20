import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type StatusHistoryItem = {
  status: string;
  open: boolean;
  changed_at?: string;
  created_at?: string;
  date?: string;
};

type Props = {
  history?: StatusHistoryItem[];
  open: boolean;
};

const UserOrderTimeline = ({ history = [], open }: Props) => {
  if (!history.length) {
    return (
      <Box
        sx={{
          border: "1px dashed rgba(255,255,255,0.14)",
          borderRadius: 2,
          p: 2,
          color: "rgba(255,255,255,0.6)",
        }}
      >
        Aucun suivi disponible pour le moment.
      </Box>
    );
  }

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      {history.map((item, index) => {
        const date = item.changed_at ?? item.created_at ?? item.date;

        return (
          <Box
            key={`${item.status}-${index}`}
            sx={{
              display: "grid",
              gridTemplateColumns: "24px 1fr",
              gap: 2,
              alignItems: "start",
            }}
          >
            <Box
              sx={{
                width: 14,
                height: 14,
                borderRadius: "999px",
                mt: 0.5,
                bgcolor: index === 0 ? "#fbbf24" : "rgba(255,255,255,0.35)",
              }}
            />

            <Box>
              <Typography fontWeight={600}>{item.status}</Typography>

              {date && (
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {new Date(date).toLocaleString("fr-FR")}
                </Typography>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default UserOrderTimeline;
