import { useState } from "react";

import SupplyStatsCards from "./Supply/SupplyStatsCard";
import StockIngestionForm from "./Supply/StockageIngestionForm";
import IngestionPreview from "./Supply/IngestPreview";
import RecentStockLotsTable from "./Supply/RecentStockLotsTable";
import type { DeliveryMode } from "./Supply/supplyTypes";
import buildStockPayload from "./Supply/types/buildStockPayload";

const AdminSupplyPage = () => {
  const [mode, setMode] = useState<DeliveryMode>("lineage");
  const [payloadPreview, setPayloadPreview] = useState<ReturnType<
    typeof buildStockPayload
  > | null>(null);

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            Administration
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-neutral-950">
            Gestion des stocks & livraisons
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-neutral-600">
            Centralisez l’ingestion des matières premières, des produits semi-finis et des
            produits finis tout en conservant une traçabilité claire des ingrédients.
          </p>
        </div>

        <div className="rounded-2xl border bg-neutral-50 px-4 py-3 text-sm">
          <p className="font-medium text-neutral-900">Procédure SQL</p>
          <p className="mt-1 text-neutral-500">public.ingest_stock()</p>
        </div>
      </section>
      <SupplyStatsCards />
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
        <StockIngestionForm
          mode={mode}
          onModeChange={setMode}
          onPreviewChange={setPayloadPreview}
        />
        <IngestionPreview
          mode={mode}
          payload={payloadPreview}
        />
      </section>

      <RecentStockLotsTable />
    </div>
  );
};

export default AdminSupplyPage;
