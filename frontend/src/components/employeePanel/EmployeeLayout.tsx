import { Outlet } from "react-router-dom";

import EmployeeSidebar from "./EmployeeSidebar";

const EmployeeLayout = () => {
  return (
    <div className="h-screen overflow-hidden bg-[#070c14] text-slate-100">
      <div
        className="
          flex h-full
          bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.03),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.02),transparent_45%),radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.6),transparent_60%)]
        "
      >
        <EmployeeSidebar />

        <main className="min-w-0 flex-1 overflow-y-auto px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
