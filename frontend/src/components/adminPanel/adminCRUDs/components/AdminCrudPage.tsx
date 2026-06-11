import { useCallback, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import type {
  AdminFormData,
  AdminId,
  AdminResource,
  AdminRow,
  AdminRowAction,
} from "../adminCrud.types";
import {
  createAdminResourceRow,
  deleteAdminResourceRow,
  fetchAdminResourceRows,
  runAdminRowAction,
  updateAdminResourceRow,
} from "../model/adminCrud.thunks";

import AdminDataTable from "./AdminDataTable";
import ResourceFormDialog from "./ResourceFormDialog";
import { ConfirmDialog } from "./ConfirmDialog";
import ReasonDialog from "./ReasonDialog";

type AdminCrudPageProps = {
  resource: AdminResource;
};

const EMPTY_ROWS: AdminRow[] = [];

const getRowId = (row: AdminRow, idKey: string): AdminId | null => {
  const id = row[idKey];

  if (typeof id === "string" || typeof id === "number") {
    return id;
  }

  return null;
};

const AdminCrudPage = ({ resource }: AdminCrudPageProps) => {
  const [selectedRow, setSelectedRow] = useState<AdminRow | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    action: AdminRowAction;
    row: AdminRow;
  } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const canCreate = resource.permissions?.canCreate ?? true;
  const canEdit = resource.permissions?.canEdit ?? true;
  const canDelete = resource.permissions?.canDelete ?? true;
  const rowActions = resource.rowActions ?? [];

  const dispatch = useAppDispatch();

  const rows = useAppSelector(
    (state) => state.adminCrud.rowsByResource[resource.key] ?? EMPTY_ROWS,
  );

  const loading = useAppSelector(
    (state) => state.adminCrud.loadingByResource[resource.key] ?? false,
  );

  const error = useAppSelector(
    (state) => state.adminCrud.errorByResource[resource.key] ?? null,
  );
  const resourceRef = {
    key: resource.key,
    endpoint: resource.endpoint,
  };

  const refreshRows = useCallback(() => {
    void dispatch(
      fetchAdminResourceRows({
        key: resource.key,
        endpoint: resource.endpoint,
      }),
    );
  }, [dispatch, resource.endpoint, resource.key]);

  useEffect(() => {
    refreshRows();
  }, [refreshRows]);

  const handleCreate = async (data: AdminFormData) => {
    await dispatch(
      createAdminResourceRow({
        resource: resourceRef,
        data,
      }),
    ).unwrap();

    refreshRows();
    setOpenForm(false);
  };

  const handleUpdate = async (id: number, data: AdminFormData) => {
    await dispatch(
      updateAdminResourceRow({
        resource: resourceRef,
        id,
        data,
      }),
    ).unwrap();

    refreshRows();
    setSelectedRow(null);
    setOpenForm(false);
  };

  const handleDelete = async (id: number) => {
    await dispatch(
      deleteAdminResourceRow({
        resource: resourceRef,
        id,
      }),
    ).unwrap();

    refreshRows();
  };

  const runRowAction = useCallback(
    async (action: AdminRowAction, row: AdminRow, reason?: string) => {
      setActionLoading(true);
      try {
        const body = {
          ...(action.body ?? {}),
          ...(reason !== undefined ? { reason } : {}),
        };

        await dispatch(
          runAdminRowAction({
            resourceKey: resource.key,
            path: action.buildPath(row),
            method: action.method,
            body,
          }),
        ).unwrap();

        refreshRows();
        setPendingAction(null);
      } finally {
        setActionLoading(false);
      }
    },
    [dispatch, refreshRows, resource.key],
  );

  const handleRowAction = (action: AdminRowAction, row: AdminRow) => {
    if (action.promptReason || action.confirm) {
      setPendingAction({ action, row });
      return;
    }
    void runRowAction(action, row);
  };

  const pendingPrompt = pendingAction?.action.promptReason;
  const pendingConfirm = pendingAction?.action.confirm;

  return (
    <section>
      <div className="admin-header">
        <div>
          <h1>{resource.label}</h1>
          <p>Gestion des données administratives</p>
        </div>

        {canCreate && (
          <button
            type="button"
            onClick={() => {
              setSelectedRow(null);
              setOpenForm(true);
            }}
          >
            Ajouter
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <AdminDataTable
        columns={resource.columns}
        rows={rows}
        idKey={resource.idKey}
        loading={loading}
        canEdit={canEdit}
        canDelete={canDelete}
        rowActions={rowActions}
        onRowAction={handleRowAction}
        onEdit={
          canEdit
            ? (row) => {
                setSelectedRow(row);
                setOpenForm(true);
              }
            : undefined
        }
        onDelete={
          canDelete
            ? (row) => {
                const id = getRowId(row, resource.idKey);

                if (id !== null) {
                  void handleDelete(Number(id));
                }
              }
            : undefined
        }
      />

      {pendingAction && pendingPrompt && (
        <ReasonDialog
          open
          title={pendingPrompt.title}
          description={pendingPrompt.description}
          label={pendingPrompt.label}
          defaultValue={pendingPrompt.defaultValue}
          confirmLabel={pendingPrompt.confirmLabel}
          loading={actionLoading}
          onCancel={() => setPendingAction(null)}
          onConfirm={(reason) =>
            void runRowAction(pendingAction.action, pendingAction.row, reason)
          }
        />
      )}

      {pendingAction && !pendingPrompt && pendingConfirm && (
        <ConfirmDialog
          open
          title={pendingConfirm.title}
          description={pendingConfirm.description}
          confirmLabel={pendingConfirm.confirmLabel}
          loading={actionLoading}
          onCancel={() => setPendingAction(null)}
          onConfirm={() => void runRowAction(pendingAction.action, pendingAction.row)}
        />
      )}

      <ResourceFormDialog
        open={openForm}
        fields={resource.fields}
        initialValues={selectedRow}
        onClose={() => {
          setSelectedRow(null);
          setOpenForm(false);
        }}
        onSubmit={(data) => {
          if (selectedRow) {
            const id = getRowId(selectedRow, resource.idKey);

            if (id === null) {
              return;
            }

            void handleUpdate(Number(id), data);
            return;
          }

          void handleCreate(data);
        }}
      />
    </section>
  );
};

export default AdminCrudPage;
