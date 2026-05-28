import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { useEffect } from "react";

import UserSidebarProfile from "@/components/espaceprive/UserSidebarProfile";
import SidebarNavItem from "@/components/userPanel/SideBarNavItem";
import { useAppDispatch } from "@/store/hooks";
import { fetchMyProfile } from "@/store/slices/userProfileSlice";

export default function UserLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchMyProfile());
  }, [dispatch]);

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
        component="aside"
        sx={{
          borderRight: { md: "1px solid rgba(255,255,255,0.08)" },
          borderBottom: {
            xs: "1px solid rgba(255,255,255,0.08)",
            md: "none",
          },
          p: 3,
          position: { md: "sticky" },
          top: 100,
          height: "fit-content",
        }}
      >
        <UserSidebarProfile />

        <Box
          component="nav"
          sx={{ display: "grid", gap: 1 }}
        >
          <SidebarNavItem
            label="Dashboard"
            to="/espaceprive"
          />
          <SidebarNavItem
            label="Commandes"
            to="/espaceprive/orders"
          />
          <SidebarNavItem
            label="Paramètres"
            to="/espaceprive/settings"
          />
        </Box>
      </Box>

      <Box
        component="main"
        sx={{ p: { xs: 2, md: 4 }, minWidth: 0 }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
