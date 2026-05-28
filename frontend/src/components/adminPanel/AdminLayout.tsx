import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070c14] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(166,61,89,0.16),transparent_26%),radial-gradient(circle_at_82%_24%,rgba(229,197,125,0.09),transparent_22%),radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.7),transparent_60%)]" />
      <div className="relative flex min-h-screen">
        <AdminSidebar />

        <main className="min-w-0 flex-1 overflow-y-auto px-5 py-5 md:px-8 md:py-6">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-6 flex items-center justify-between rounded-[1.75rem] border border-white/10 bg-white/[0.03] px-5 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.2)]">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.32em] text-white/32">
                  Admin console
                </p>
                <p className="mt-1 text-sm text-white/58">
                  Pilotage, opérations et maintenance du catalogue.
                </p>
              </div>

              <span className="rounded-full border border-[#a43c57]/30 bg-[#8d314b]/18 px-4 py-2 text-[0.72rem] uppercase tracking-[0.28em] text-[#f1d6dc]">
                Admin
              </span>
            </div>

            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
