import { useEffect, useMemo, useState } from "react";
import { Crown, Euro, ReceiptText, Sparkles } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAdminDashboard } from "@/store/slices/adminAnalyticsSlice";
import type { MenuStat, MonthStat, StatusStat } from "@/types/adminAnalTypes";

import MonthlyRevenueChart from "./LinearMenusRevenuesChart";

const currency = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const getMenuLabel = (menu: MenuStat) => {
  return `Menu #${menu.menuId ?? "?"}`;
};
// const getMonthLabel = (month: number) => {
//   if (!month) return "—";
//   return new Intl.DateTimeFormat("fr-FR", {
//     month: "short",
//   }).format(new Date(2026, month - 1, 1));
// };
const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.adminAnalytics);
  const [menuPage, setMenuPage] = useState(1);

  useEffect(() => {
    void dispatch(fetchAdminDashboard());
  }, [dispatch]);

  const menus: MenuStat[] = data.menus;
  const monthlyStats: MonthStat[] = data.months;
  const statusStats: StatusStat[] = data.statuses;
  const analytics = useMemo(() => {
    const sortedByRevenue = [...menus].sort(
      (a, b) => Number(b.totalRevenue) - Number(a.totalRevenue),
    );

    const bestMenu =
      menus.find((menu) => menu.menuId === data.overview.topMenuId) ??
      sortedByRevenue[0] ??
      null;

    return {
      totalRevenue: data.overview.totalRevenue,
      totalOrders: data.overview.totalOrders,
      averageOrderValue: data.overview.averageRevenue,
      bestMenu,
      bestMenuRevenue: bestMenu?.totalRevenue ?? 0,
    };
  }, [data.overview, menus]);

  const maxStatusCount = Math.max(...statusStats.map((item) => Number(item.count)), 1);
  const MENU_PAGE_SIZE = 5;
  const sortedMenus = useMemo(() => {
    return [...menus].sort(
      (a, b) => Number(b.totalRevenue ?? 0) - Number(a.totalRevenue ?? 0),
    );
  }, [menus]);

  const menuPageCount = Math.max(1, Math.ceil(sortedMenus.length / MENU_PAGE_SIZE));
  const safeMenuPage = Math.min(menuPage, menuPageCount);
  const paginatedMenus = sortedMenus.slice(
    (safeMenuPage - 1) * MENU_PAGE_SIZE,
    safeMenuPage * MENU_PAGE_SIZE,
  );

  if (loading) {
    return (
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Tableau de bord administrateur
          </h1>
          <p className="text-sm text-white/60">Chargement des indicateurs...</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-2xl border border-white/10 bg-white/[0.04]"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-300">
        Impossible de charger le tableau de bord.
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#e5c57d]">
            Overview
          </p>
          <h1 className="mt-3 font-display text-4xl text-white md:text-5xl">
            Vue d'ensemble hi-fi.
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Vue consolidée des commandes, revenus, performances menus et statuts
            opérationnels.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
          <Sparkles className="h-4 w-4 text-[#e5c57d]" />
          Données synchronisées depuis PostgreSQL et MongoDB
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,19,25,0.98),rgba(10,12,17,0.96))] p-5 shadow-xl">
          <Euro className="h-5 w-5 text-[#e5c57d]" />
          <p className="text-sm text-slate-400">Revenu total</p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {currency.format(analytics.totalRevenue)}
          </p>
          <p className="mt-3 text-xs text-emerald-400">Cumul des revenus par menu</p>
        </div>
        <div className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,19,25,0.98),rgba(10,12,17,0.96))] p-5 shadow-xl">
          <ReceiptText className="h-5 w-5 text-[#e5c57d]" />
          <p className="text-sm text-slate-400">Commandes</p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {analytics.totalOrders}
          </p>
          <p className="mt-3 text-xs text-slate-500">
            Total calculé depuis les menus commandés
          </p>
        </div>
        <div className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,19,25,0.98),rgba(10,12,17,0.96))] p-5 shadow-xl">
          <p className="text-sm text-slate-400">Panier moyen</p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {currency.format(analytics.averageOrderValue)}
          </p>
          <p className="mt-3 text-xs text-slate-500">Revenu moyen par commande</p>
        </div>
        <div className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,19,25,0.98),rgba(10,12,17,0.96))] p-5 shadow-xl">
          <Crown className="h-5 w-5 text-[#e5c57d]" />
          <p className="text-sm text-slate-400">Meilleur menu</p>
          <p className="mt-3 truncate text-2xl font-semibold text-white">
            {analytics.bestMenu ? getMenuLabel(analytics.bestMenu) : "—"}
          </p>
          <p className="mt-3 text-xs text-amber-300">
            {currency.format(analytics.bestMenuRevenue)}
          </p>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <MonthlyRevenueChart data={monthlyStats} />
          <div className="rounded-2xl w-full border border-white/10 bg-slate-950 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white">Statuts des commandes</h2>
            <p className="mb-6 text-sm text-slate-400">
              Répartition opérationnelle par statut.
            </p>
            {statusStats.length ? (
              <div className="space-y-4">
                {statusStats.map((item, index) => {
                  const count = Number(item.count);
                  const percent = Math.max((count / maxStatusCount) * 100, 4);

                  return (
                    <div key={`${item.status}-${index}`}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="capitalize text-slate-300">{item.status}</span>
                        <span className="text-slate-400">{count}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-emerald-400"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                Aucune donnée de statut disponible.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-xl">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-semibold text-white">Performance des menus</h2>
            <p className="text-sm text-slate-400">
              Classement par revenu généré et nombre de commandes.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-4 py-4 font-medium">Menu</th>
                <th className="px-4 py-4 font-medium">Commandes</th>
                <th className="px-4 py-4 font-medium">Revenu</th>
                <th className="px-4 py-4 font-medium">Panier moyen</th>
                <th className="px-4 py-4 text-right font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMenus.map((menu) => {
                const orders = Number(menu.timesOrdered ?? 0);
                const revenue = Number(menu.totalRevenue ?? 0);
                const average = orders > 0 ? revenue / orders : 0;
                return (
                  <tr
                    key={menu.menuId}
                    className="border-b border-white/5 text-slate-200 transition hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-4 font-medium">{getMenuLabel(menu)}</td>
                    <td className="px-4 py-4">{orders}</td>
                    <td className="px-4 py-4">{currency.format(revenue)}</td>
                    <td className="px-4 py-4">{currency.format(average)}</td>
                    <td className="px-4 py-4 text-right">
                      <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400">
                        Actif
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
            <p className="text-sm text-slate-500">
              Page {safeMenuPage} sur {menuPageCount} · {sortedMenus.length} menus
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={safeMenuPage === 1}
                onClick={() => setMenuPage((page) => Math.max(1, page - 1))}
                className="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-white/10"
              >
                Précédent
              </button>
              <button
                type="button"
                disabled={safeMenuPage === menuPageCount}
                onClick={() => setMenuPage((page) => Math.min(menuPageCount, page + 1))}
                className="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-white/10"
              >
                Suivant
              </button>
            </div>
          </div>
          {!menus.length && (
            <p className="py-8 text-center text-sm text-slate-500">
              Aucune performance menu disponible.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
