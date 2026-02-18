import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";

import OrdersTable from "@/components/ui/widgets/OrdersTable";
import PieChartWidget from "@/components/ui/widgets/PieChartWidget";
import LineChartWidget from "@/components/ui/widgets/LineChartWidget";
import RadarPlotWidget from "@/components/ui/widgets/RadarPlotWidget";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMyOrders } from "@/store/orders/userOrdersSlice";
import UserSidebarProfile from "@/components/userPanel/Siedbar/UserSidebarProfile";
import SidebarNavItem from "@/components/userPanel/SideBarNavItem";
import { fetchMyProfile } from "@/store/slices/userProfileSlice";

const UserPanel = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.userOrders.list);
  const status = useAppSelector((state) => state.userOrders.status);

  useEffect(() => {
    dispatch(fetchMyProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <Paper variant="glass" elevation={2} sx={{ borderRadius: "12px" }}>
      <Box
        sx={{
          display: "grid",
          gap: 4,
        }}
      >
        <Box
          sx={{
            borderRight: { md: "1px solid rgba(255,255,255,0.08)" },
            borderBottom: {
              xs: "1px solid rgba(255,255,255,0.08)",
              md: "none",
            },
            p: 2,
          }}
        >
          <UserSidebarProfile />

          <SidebarNavItem label="Dashboard" active />
          <SidebarNavItem label="Orders" />
          <SidebarNavItem label="Settings" />
        </Box>
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Orders
          </Typography>
          <Box
            sx={{
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 2,
              p: 2,
            }}
          >
            <OrdersTable orders={orders} loading={status === "loading"} />
          </Box>
          <Box
            sx={{
              mt: 4,
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: 3,
            }}
          >
            <RadarPlotWidget />
            <PieChartWidget />
            <LineChartWidget />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserPanel;
