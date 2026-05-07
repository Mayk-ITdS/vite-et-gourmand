import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";

interface Props {
  label: string;
  to: string;
}

export default function SidebarNavItem({ label, to }: Props) {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderRadius: 2,
            fontSize: "0.9rem",
            transition: "all 0.2s ease",
            background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
            color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
            "&:hover": {
              background: "rgba(255,255,255,0.05)",
              color: "#fff",
            },
          }}
        >
          {label}
        </Box>
      )}
    </NavLink>
  );
}
