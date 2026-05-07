import { SectionSurface } from "@/layouts/SectionSurface";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

const adminLayoutBackgroundSx = {
  minHeight: "100vh",
  padding: "20px",
  backgroundColor: "#070c14",
  backgroundImage: `
    radial-gradient(circle at 20% 10%, rgba(255,255,255,0.03), transparent 40%),
    radial-gradient(circle at 80% 30%, rgba(255,255,255,0.02), transparent 45%),
    radial-gradient(circle at 50% 120%, rgba(0,0,0,0.6), transparent 60%)
  `,
  color: "#e5e7eb",
};

const AdminLayout = () => {
  return (
    <div className="space-y-8">
      <SectionSurface>
        <Box sx={adminLayoutBackgroundSx}>
          <Outlet />
        </Box>
      </SectionSurface>
    </div>
  );
};
export default AdminLayout;
