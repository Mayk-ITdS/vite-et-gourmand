import { Outlet } from "react-router-dom";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Toaster } from "@/components/ui/sonner";
const AppLayout = () => {
  return (
    <div className="min-h-screen ml-0 bg-background bg-gradient-to-b from-primary/5 via-background to-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 h-28 items-center flex border-b bg-background/70 backdrop-blur-xl">
        <Navbar />
      </header>
      <main className="mx-auto w-full px-4 py-8 flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};
export default AppLayout;
