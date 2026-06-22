import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { fetchAdminResourceRows } from "../adminPanel/adminCRUDs/model/adminCrud.thunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type Counts = {
  pendingReviews: number | null;
  pendingOrders: number | null;
};

type EmployeeOrdersDataRow = {
  res_id: number;
  status: string | null;
};

const StatCard = ({
  label,
  value,
  to,
}: {
  label: string;
  value: number | null;
  to: string;
}) => (
  <Link
    to={to}
    className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-yellow-500/40 hover:bg-slate-900"
  >
    <p className="text-sm text-white/55">{label}</p>
    <p className="mt-2 text-3xl font-semibold text-white">
      {value === null ? "—" : value}
    </p>
  </Link>
);

const EmployeeDashboard = () => {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(
    (state) => state.adminCrud.rowsByResource["employee-reviews"],
  );
  const orders = useAppSelector(
    (state) => state.adminCrud.rowsByResource["orders"] as EmployeeOrdersDataRow[],
  );

  useEffect(() => {
    dispatch(
      fetchAdminResourceRows({ key: "employee-reviews", endpoint: "/reviews/pending" }),
    );
    dispatch(fetchAdminResourceRows({ key: "orders", endpoint: "/admin/orders" }));
  }, [dispatch]);

  const counts: Counts = useMemo(() => {
    return {
      pendingReviews: reviews?.length ?? null,
      pendingOrders: orders
        ? orders.filter((orderRow) => orderRow?.status === "pending").length
        : null,
    };
  }, [orders, reviews]);

  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold text-white">Tableau de bord</h1>
        <p className="mt-1 text-sm text-white/55">
          Modération des avis et confirmation des réservations.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          label="Avis en attente de modération"
          value={counts?.pendingReviews}
          to="/employee/reviews"
        />
        <StatCard
          label="Réservations en attente"
          value={counts?.pendingOrders}
          to="/employee/orders"
        />
      </div>
    </section>
  );
};

export default EmployeeDashboard;
