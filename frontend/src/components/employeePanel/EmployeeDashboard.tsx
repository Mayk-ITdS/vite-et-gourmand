import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "@/utils/api";

type Counts = {
  pendingReviews: number | null;
  pendingOrders: number | null;
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
  const [counts, setCounts] = useState<Counts>({
    pendingReviews: null,
    pendingOrders: null,
  });

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const [reviews, orders] = await Promise.all([
          api.get("/reviews/pending"),
          api.get("/employee/orders"),
        ]);

        if (!active) return;

        const reviewRows = Array.isArray(reviews.data) ? reviews.data : [];
        const orderRows = Array.isArray(orders.data?.data) ? orders.data.data : [];

        setCounts({
          pendingReviews: reviewRows.length,
          pendingOrders: orderRows.filter(
            (o: { status?: string }) => o.status === "pending",
          ).length,
        });
      } catch {
        if (active) {
          setCounts({ pendingReviews: null, pendingOrders: null });
        }
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, []);

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
          value={counts.pendingReviews}
          to="/employee/reviews"
        />
        <StatCard
          label="Réservations en attente"
          value={counts.pendingOrders}
          to="/employee/orders"
        />
      </div>
    </section>
  );
};

export default EmployeeDashboard;
