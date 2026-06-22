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
        gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "260px minmax(0, 1fr)" },
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
          background: {
            md: "linear-gradient(180deg, rgba(126,37,59,0.10), rgba(20,18,16,0))",
          },
          p: { xs: 2, md: 3 },
          position: { md: "sticky" },
          top: 100,
          height: "fit-content",
        }}
      >
        <UserSidebarProfile />

        <Box
          component="nav"
          sx={{
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            gap: 1,
            overflowX: { xs: "auto", md: "visible" },
            pb: { xs: 1, md: 0 },
          }}
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
