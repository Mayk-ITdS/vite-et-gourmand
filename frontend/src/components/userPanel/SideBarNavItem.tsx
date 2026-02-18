import Box from "@mui/material/Box";

const SidebarNavItem = ({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        py: 1.2,
        cursor: "pointer",
        color: active ? "#C6A56B" : "rgba(255,255,255,0.7)",
        fontWeight: 400,
        letterSpacing: active ? "0.5px" : "0px",
        transition: "all 0.2s ease",
        "&:hover": {
          color: "rgba(255,255,255,0.95)",
          letterSpacing: "0.5px",
        },
        "&::after": active
          ? {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "60%",
              height: "1px",
              background: "linear-gradient(90deg, #6E0F1A, #C6A56B)",
              boxShadow: "0 0 6px rgba(198,165,107,0.4)",
            }
          : {},
      }}
    >
      {label}
    </Box>
  );
};
export default SidebarNavItem;
