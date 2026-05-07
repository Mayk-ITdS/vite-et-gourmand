import { useAppDispatch, useAppSelector } from "@/store/hooks";
import AdminDataTable from "./AdminDataTable";
import OverviewStats from "./OverViewStats";
import { fetchAdminDashboard } from "@/store/slices/adminAnalyticsSlice";
import { useEffect } from "react";
import { fetchMenus } from "@/store/menus/menusSlice";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const adminData = useAppSelector((state) => state.adminAnalytics.data);
  const adminLoading = useAppSelector((state) => state.adminAnalytics.loading);
  const adminError = useAppSelector((state) => state.adminAnalytics.error);
  const menuStatus = useAppSelector((s) => s.menus.list.status);
  const menuList = useAppSelector((state) => state.menus.list.data ?? []);
  const menusLoading = useAppSelector((state) => state.menus.list.status == "loading");
  const menusError = useAppSelector((state) => state.menus.details.error);

  useEffect(() => {
    if (!adminData && !adminLoading) {
      dispatch(fetchAdminDashboard());
    }
    if (menuStatus == "idle") {
      dispatch(fetchMenus());
    }
  }, [dispatch, adminData, adminLoading, menuStatus]);

  const loading = adminLoading || menusLoading;
  const error = adminError || menusError;

  if (loading) {
    return <p className="text-white/60">Chargement du dashboard...</p>;
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }
  if (!adminData) {
    return <p className="text-white/60">Aucune donnée disponible.</p>;
  }

  const overview = adminData.overview;

  const topMenu = menuList.find((menu) => Number(menu.menu_id) === Number(overview.topMenuId));

  const topMenuLabel: string = topMenu
    ? `${topMenu.menu_name} \n ${topMenu.menu_id}`
    : overview.topMenuId
      ? `Menu #${overview.topMenuId}`
      : "—";

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-semibold tracking-wide">System Overview</h1>

      <OverviewStats
        totalRevenue={overview.totalRevenue}
        totalOrders={overview.totalOrders}
        averageRevenue={overview.averageRevenue}
        topMenuLabel={topMenuLabel}
      />
      <div className="flex flex-row gap-30">
        <AdminSidebar />
        <AdminDataTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
