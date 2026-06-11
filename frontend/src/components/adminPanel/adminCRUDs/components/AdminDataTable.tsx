import { useState, type ReactNode } from "react";

import type { AdminColumn, AdminRow, AdminRowAction } from "../adminCrud.types";

import { ConfirmDialog } from "./ConfirmDialog";

export type AdminDataTableProps = {
  columns: AdminColumn[];
  rows: AdminRow[];
  idKey: string;
  loading?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  rowActions?: AdminRowAction[];
  onEdit?: (row: AdminRow) => void;
  onDelete?: (row: AdminRow) => void;
  onRowAction?: (action: AdminRowAction, row: AdminRow) => void;
};

const rowActionClassName = (variant: AdminRowAction["variant"]): string => {
  if (variant === "success") {
    return "rounded-lg px-3 py-1 text-sm text-green-400 hover:bg-green-500/10";
  }
  if (variant === "danger") {
    return "rounded-lg px-3 py-1 text-sm text-red-400 hover:bg-red-500/10";
  }
  return "rounded-lg px-3 py-1 text-sm text-blue-400 hover:bg-blue-500/10";
};

const getStringValue = (value: unknown): string | null => {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return null;
};

const getRowKey = (row: AdminRow, idKey: string): string | number => {
  const id = row[idKey];

  if (typeof id === "string" || typeof id === "number") {
    return id;
  }

  return JSON.stringify(row);
};

const getImageAlt = (row: AdminRow): string => {
  return (
    getStringValue(row.menu_name) ??
    getStringValue(row.name) ??
    getStringValue(row.title) ??
    "Image"
  );
};

const formatCellValue = (value: unknown, column: AdminColumn): ReactNode => {
  if (value === null || value === undefined || value === "") {
    return <span className="text-slate-500">—</span>;
  }

  if (column.type === "currency") {
    const numericValue =
      typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;

    if (!Number.isFinite(numericValue)) {
      return <span className="text-slate-500">—</span>;
    }

    return `${numericValue.toFixed(2)} €`;
  }

  if (column.type === "boolean") {
    const booleanValue =
      value === true || value === "true" || value === 1 || value === "1";

    return (
      <span
        className={
          booleanValue
            ? "rounded-full bg-green-500/15 px-3 py-1 text-xs font-medium text-green-400"
            : "rounded-full bg-red-500/15 px-3 py-1 text-xs font-medium text-red-400"
        }
      >
        {booleanValue ? "Actif" : "Inactif"}
      </span>
    );
  }

  if (column.type === "date") {
    if (
      typeof value !== "string" &&
      typeof value !== "number" &&
      !(value instanceof Date)
    ) {
      return <span className="text-slate-500">—</span>;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return <span className="text-slate-500">—</span>;
    }

    return date.toLocaleDateString("fr-FR");
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  return JSON.stringify(value);
};

const AdminDataTable = ({
  columns,
  rows,
  idKey,
  loading = false,
  canEdit = true,
  canDelete = true,
  rowActions = [],
  onEdit,
  onDelete,
  onRowAction,
}: AdminDataTableProps) => {
  const [pendingDeleted, setPendingDeleted] = useState<AdminRow | null>(null);
  if (loading) {
    return <p className="text-sm text-white/60">Chargement des données...</p>;
  }

  if (!rows.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-slate-950 p-6 text-sm text-slate-400">
        Aucune donnée disponible.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-left text-xs uppercase tracking-wide text-slate-400">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-4 font-medium"
                >
                  {column.label}
                </th>
              ))}

              {(rowActions.length > 0 ||
                (onEdit && canEdit) ||
                (onDelete && canDelete)) && (
                <th className="px-4 py-4 text-right font-medium">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={getRowKey(row, idKey)}
                className="border-b border-white/5 text-slate-200 transition hover:bg-white/[0.03]"
              >
                {columns.map((column) => {
                  const value = row[column.key];

                  if (column.type === "image") {
                    const imageSrc =
                      typeof value === "string" && value.length > 0 ? value : null;

                    return (
                      <td
                        key={column.key}
                        className="px-4 py-4"
                      >
                        {imageSrc ? (
                          <img
                            src={imageSrc}
                            alt={getImageAlt(row)}
                            className="h-14 w-20 rounded-xl object-cover"
                          />
                        ) : (
                          <span className="text-slate-500">Aucune image</span>
                        )}
                      </td>
                    );
                  }

                  return (
                    <td
                      key={column.key}
                      className="px-4 py-4"
                    >
                      {formatCellValue(value, column)}
                    </td>
                  );
                })}

                {(rowActions.length > 0 ||
                  (onEdit && canEdit) ||
                  (onDelete && canDelete)) && (
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {rowActions.map((action) => (
                        <button
                          key={action.key}
                          type="button"
                          onClick={() => onRowAction?.(action, row)}
                          className={rowActionClassName(action.variant)}
                        >
                          {action.label}
                        </button>
                      ))}
                      {onEdit && canEdit && (
                        <button
                          type="button"
                          onClick={() => onEdit(row)}
                          className="rounded-lg px-3 py-1 text-sm text-blue-400 hover:bg-blue-500/10"
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && canDelete && (
                        <button
                          type="button"
                          onClick={() => setPendingDeleted(row)}
                          className="rounded-lg px-3 py-1 text-sm text-red-400 hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      )}
                      <ConfirmDialog
                        title={`Tu veux vraiment supprimer ${getStringValue(pendingDeleted)} ?`}
                        description="Cette action est irréversible. Le menu sera supprimé de la liste."
                        confirmLabel="Supprimer"
                        cancelLabel="Annuler"
                        confirmColor="error"
                        onCancel={() => setPendingDeleted(null)}
                        open={pendingDeleted !== null}
                        onConfirm={() => {
                          if (pendingDeleted) {
                            onDelete?.(row);
                            setPendingDeleted(null);
                          }
                        }}
                      />
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDataTable;
