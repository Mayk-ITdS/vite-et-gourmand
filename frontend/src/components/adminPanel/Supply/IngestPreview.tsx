import type { DeliveryMode } from "./supplyTypes";
import type buildStockPayload from "./types/buildStockPayload";

interface IngestionPreviewProps {
  mode: DeliveryMode;
  payload: ReturnType<typeof buildStockPayload> | null;
}

const IngestionPreview = ({ mode, payload }: IngestionPreviewProps) => {
  return (
    <aside className="space-y-4 rounded-2xl border bg-neutral-950 p-6 text-white shadow-sm">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-400">
          Aperçu technique
        </p>

        <h2 className="mt-1 text-lg font-semibold">Payload envoyé à ingest_stock()</h2>

        <p className="mt-2 text-sm text-neutral-400">
          Cette zone sert à visualiser la structure attendue par la procédure SQL. Tu brancheras
          ensuite les vraies valeurs du formulaire.
        </p>
      </div>

      <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-neutral-400">Mode</span>
          <span className="font-medium">{mode}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-400">Status livraison</span>
          <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-300">
            arrived
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-400">Validation</span>
          <span className="text-neutral-200">À faire côté UI/API</span>
        </div>
      </div>

      <pre className="max-h-[460px] overflow-auto rounded-2xl border border-white/10 bg-black/40 p-4 text-xs leading-relaxed text-neutral-200">
        {JSON.stringify(payload, null, 2)}
      </pre>
    </aside>
  );
};

export default IngestionPreview;
