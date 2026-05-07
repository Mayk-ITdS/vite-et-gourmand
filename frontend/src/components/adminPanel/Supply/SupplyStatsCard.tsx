const stats = [
  {
    label: "Lots reçus",
    value: "—",
    description: "À connecter à la base",
  },
  {
    label: "Matières premières",
    value: "—",
    description: "Produits de type raw",
  },
  {
    label: "Produits composés",
    value: "—",
    description: "Semi-finis / finis",
  },
  {
    label: "Alertes stock",
    value: "—",
    description: "Ruptures et seuils faibles",
  },
];

const SupplyStatsCards = () => {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article key={stat.label} className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-neutral-500">{stat.label}</p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-neutral-950">{stat.value}</p>

          <p className="mt-2 text-sm text-neutral-500">{stat.description}</p>
        </article>
      ))}
    </section>
  );
};

export default SupplyStatsCards;
