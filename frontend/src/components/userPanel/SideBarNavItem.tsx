import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";

interface Props {
  label: string;
  to: string;
}

export default function SidebarNavItem({ label, to }: Props) {
  return (
    <NavLink
      to={to}
      style={{ textDecoration: "none" }}
    >
      {({ isActive }) => (
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderRadius: 2,
            fontSize: "0.9rem",
            fontWeight: isActive ? 600 : 400,
            whiteSpace: "nowrap",
            borderLeft: isActive ? "3px solid #d4af37" : "3px solid transparent",
            transition: "all 0.2s ease",
            background: isActive ? "rgba(126,37,59,0.22)" : "transparent",
            color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
            "&:hover": {
              background: "rgba(126,37,59,0.14)",
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
