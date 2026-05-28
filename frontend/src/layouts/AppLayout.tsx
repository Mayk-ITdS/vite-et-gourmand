import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Toaster } from "@/components/ui/sonner";

const AppLayout = () => {
  return (
    <Box className="relative min-h-screen overflow-hidden bg-[#080a0f] text-[#f4efe9]">
      <Box className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(172,49,78,0.24),transparent_30%),radial-gradient(circle_at_78%_14%,rgba(214,188,120,0.14),transparent_24%),radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.76),transparent_62%)]" />
      <Box className="pointer-events-none fixed inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:92px_92px]" />

      <Box className="relative z-10 flex min-h-screen flex-col">
        <Box className="sticky top-0 z-50 border-b border-white/10 bg-[#080a0f]/72 backdrop-blur-2xl">
          <Navbar />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box className="mx-auto w-full max-w-[1440px] px-4 py-6 md:px-6 lg:px-8">
            <Outlet />
          </Box>
        </Box>

        <Footer />
        <Toaster />
      </Box>
    </Box>
  );
};

export default AppLayout;
