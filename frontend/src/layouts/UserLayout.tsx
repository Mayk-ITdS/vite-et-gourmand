import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import UserSidebarProfile from "@/components/userPanel/Siedbar/UserSidebarProfile";
import SidebarNavItem from "@/components/userPanel/SideBarNavItem";

export default function UserLayout() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "260px 1fr" },
        minHeight: "75vh",
        gap: 4,
      }}
    >
      <Box
        sx={{
          borderRight: { md: "1px solid rgba(255,255,255,0.08)" },
          p: 3,
          position: { md: "sticky" },
          top: 100,
          height: "fit-content",
        }}
      >
        <UserSidebarProfile />

        <SidebarNavItem label="Dashboard" to="/espaceprive" />
        <SidebarNavItem label="Orders" to="/espaceprive/orders" />
        <SidebarNavItem label="Settings" to="/espaceprive/settings" />
      </Box>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Outlet />
      </Box>
    </Box>
  );
}
