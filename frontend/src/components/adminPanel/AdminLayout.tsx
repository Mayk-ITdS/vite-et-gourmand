import OverviewStats from "./OverViewStats";
import { SectionSurface } from "@/layouts/SectionSurface";
import Box from "@mui/material/Box";
import RevenueTrendChart from "./MonthlyRevenueTrend";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { fetchAdminDashboard } from "@/store/slices/adminAnalyticsSlice";

import Grid from "@mui/material/Grid";
import MyPieChartWidget from "../ui/widgets/PieChartWidget";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);

  return (
    <div className="space-y-8">
      <SectionSurface>
        <Box
          sx={{
            minHeight: "50vh",
            backgroundColor: "#070c14",
            backgroundImage: `
            radial-gradient(circle at 20% 10%, rgba(255,255,255,0.03), transparent 40%),
            radial-gradient(circle at 80% 30%, rgba(255,255,255,0.02), transparent 45%),
            radial-gradient(circle at 50% 120%, rgba(0,0,0,0.6), transparent 60%)
          `,
            color: "#e5e7eb",
          }}
        >
          <OverviewStats />
        </Box>

        <Box
          sx={{
            minHeight: "100vh",
            backgroundColor: "#070c14",
            backgroundImage: `
            radial-gradient(circle at 20% 10%, rgba(255,255,255,0.03), transparent 40%),
            radial-gradient(circle at 80% 30%, rgba(255,255,255,0.02), transparent 45%),
            radial-gradient(circle at 50% 120%, rgba(0,0,0,0.6), transparent 60%)
          `,
            color: "#e5e7eb",
          }}
        >
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 4 }}>
              <MyPieChartWidget />
            </Grid>
            <Grid size={{ xs: 12, xl: 5 }}>
              <RevenueTrendChart />
            </Grid>
          </Grid>
        </Box>
      </SectionSurface>
    </div>
  );
};
export default AdminDashboard;
