import { useRef, useState } from "react";
import type { DeliveryMode } from "./supplyTypes";
import { parseImportFile, type IngestPayload } from "./helpers/fileParseHelper";

type StockIngestionFileFormProps = {
  mode: DeliveryMode;
  hasLoadedFile?: boolean;
  onClearLoadedFile?: () => void;
  onPayloadLoaded: (data: {
    payload: IngestPayload;
    previewPayload: IngestPayload;
    previewJson: string;
    fileName: string;
    totalRows: number;
  }) => void;
  onError: (message: string) => void;
};

const StockIngestionFileForm = ({
  mode,
  onPayloadLoaded,
  onError,
  hasLoadedFile,
  onClearLoadedFile,
}: StockIngestionFileFormProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loadingFile, setLoadingFile] = useState(false);

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    try {
      setLoadingFile(true);

      const parsed = await parseImportFile(selectedFile, mode);

      onPayloadLoaded({
        payload: parsed.fullPayload,
        previewPayload: parsed.previewPayload,
        previewJson: JSON.stringify(parsed.previewPayload, null, 2),
        fileName: selectedFile.name,
        totalRows: parsed.totalRows,
      });
    } catch (err: unknown) {
      onError(
        err instanceof Error ? err.message : "Erreur lors de la lecture du fichier",
      );
    } finally {
      setLoadingFile(false);

      // pozwala załadować drugi raz ten sam plik
      event.target.value = "";
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.csv,application/json,text/csv"
        onChange={handleFileChange}
        className="hidden"
      />

      {hasLoadedFile ? (
        <button
          type="button"
          onClick={onClearLoadedFile}
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
        >
          Retirer le fichier
        </button>
      ) : (
        <button
          type="button"
          onClick={handleOpenFilePicker}
          disabled={loadingFile}
          className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loadingFile ? "Chargement du fichier..." : "Charger un fichier"}
        </button>
      )}
    </>
  );
};

export default StockIngestionFileForm;
