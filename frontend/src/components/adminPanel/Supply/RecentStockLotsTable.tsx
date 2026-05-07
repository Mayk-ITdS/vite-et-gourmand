import type { RecentStockLot } from "./supplyTypes";
const mockLots: RecentStockLot[] = [
  {
    id: 1,
    productName: "tomates",
    type: "raw",
    producerName: "Ferme du Soleil",
    quantity: 10,
    unit: "kg",
    arrivalDate: "2026-05-01",
    expirationDate: "2026-05-12",
    status: "arrived",
  },
  {
    id: 2,
    productName: "sauce tomate maison",
    type: "semi",
    producerName: "Cuisine Centrale",
    quantity: 5,
    unit: "kg",
    arrivalDate: "2026-05-01",
    expirationDate: "2026-05-12",
    status: "arrived",
  },
];

const RecentStockLotsTable = () => {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-950">Derniers lots reçus</h2>

          <p className="mt-1 text-sm text-neutral-500">
            Aperçu des dernières entrées de stock. À connecter à la table products.
          </p>
        </div>

        <button
          type="button"
          className="rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-neutral-50"
        >
          Rafraîchir
        </button>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-500">
            <tr>
              <th className="px-4 py-3 font-medium">Produit</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Producteur</th>
              <th className="px-4 py-3 font-medium">Quantité</th>
              <th className="px-4 py-3 font-medium">Arrivée</th>
              <th className="px-4 py-3 font-medium">Expiration</th>
              <th className="px-4 py-3 font-medium">Statut</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {mockLots.map((lot) => (
              <tr key={lot.id} className="hover:bg-neutral-50/70">
                <td className="px-4 py-3 font-medium text-neutral-950">{lot.productName}</td>

                <td className="px-4 py-3">
                  <ProductTypeBadge type={lot.type} />
                </td>

                <td className="px-4 py-3 text-neutral-600">{lot.producerName}</td>

                <td className="px-4 py-3 text-neutral-900">
                  {lot.quantity} {lot.unit}
                </td>

                <td className="px-4 py-3 text-neutral-600">{lot.arrivalDate}</td>

                <td className="px-4 py-3 text-neutral-600">{lot.expirationDate}</td>

                <td className="px-4 py-3">
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                    {lot.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const ProductTypeBadge = ({ type }: { type: RecentStockLot["type"] }) => {
  const labelByType = {
    raw: "Matière première",
    semi: "Semi-fini",
    finished: "Fini",
  };

  return (
    <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700">
      {labelByType[type]}
    </span>
  );
};

export default RecentStockLotsTable;
