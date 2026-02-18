import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Toaster } from "@/components/ui/sonner";

const AppLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#2a1f16",
        backgroundImage: `
        repeating-linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.035),
        rgba(255, 255, 255, 0.035) 1px,
        transparent 1px,
        transparent 5px
      ),
  /* subtle vignette */
  radial-gradient(circle at 50% 120%, rgba(0,0,0,0.45), transparent 60%),

  /* wine warmth */
  radial-gradient(circle at 65% 18%, rgba(140,50,55,0.22), transparent 50%),

  /* light reflections */
  radial-gradient(circle at 20% 10%, rgba(255,255,255,0.06), transparent 40%),
  radial-gradient(circle at 80% 30%, rgba(255,255,255,0.04), transparent 45%),

 
  /* micro noise */
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='2'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")
    
`,

        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        color: "#f5f5f4",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(2,6,23,0.6)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Navbar />
      </Box>
      <Box sx={{ flex: 1, px: { xs: 2, md: 4 }, py: 4 }}>
        <Outlet />
      </Box>

      <Footer />
      <Toaster />
    </Box>
  );
};

export default AppLayout;
