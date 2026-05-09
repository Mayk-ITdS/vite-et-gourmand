import Papa from "papaparse";
import type { ParseResult } from "papaparse";

export type IngestMode = "lineage" | "synthesis";

export type IngestRow = Record<string, unknown>;

export type IngestPayload =
  | { raw_deliveries: IngestRow[] }
  | { semi_finished_deliveries: IngestRow[] };

export type ParsedImport = {
  fullPayload: IngestPayload;
  previewPayload: IngestPayload;
  totalRows: number;
};

const PREVIEW_LIMIT = 10;

const wrapRowsForMode = (rows: IngestRow[], mode: IngestMode): IngestPayload => {
  if (mode === "lineage") {
    return {
      raw_deliveries: rows,
    };
  }

  return {
    semi_finished_deliveries: rows,
  };
};

const extractRowsFromJsonPayload = (parsed: unknown): IngestRow[] => {
  if (Array.isArray(parsed)) {
    return parsed as IngestRow[];
  }

  if (parsed && typeof parsed === "object") {
    const payload = parsed as {
      raw_deliveries?: IngestRow[];
      semi_finished_deliveries?: IngestRow[];
    };

    return payload.raw_deliveries ?? payload.semi_finished_deliveries ?? [];
  }

  return [];
};

export const parseImportFile = async (
  file: File,
  mode: IngestMode,
): Promise<ParsedImport> => {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (extension === "json") {
    const text = await file.text();
    const parsed = JSON.parse(text);

    const rows = extractRowsFromJsonPayload(parsed);

    return {
      fullPayload: wrapRowsForMode(rows, mode),
      previewPayload: wrapRowsForMode(rows.slice(0, PREVIEW_LIMIT), mode),
      totalRows: rows.length,
    };
  }

  if (extension === "csv") {
    return new Promise<ParsedImport>((resolve, reject) => {
      Papa.parse<IngestRow>(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,

        complete: (result: ParseResult<IngestRow>) => {
          if (result.errors.length > 0) {
            reject(result.errors[0]);
            return;
          }

          const rows = result.data.filter((row) => {
            return Object.values(row).some(
              (value) => value !== null && value !== undefined && value !== "",
            );
          });

          resolve({
            fullPayload: wrapRowsForMode(rows, mode),
            previewPayload: wrapRowsForMode(rows.slice(0, PREVIEW_LIMIT), mode),
            totalRows: rows.length,
          });
        },

        error: (error: Error) => {
          reject(error);
        },
      });
    });
  }

  throw new Error("Format non supporté. Utilisez un fichier JSON ou CSV.");
};
