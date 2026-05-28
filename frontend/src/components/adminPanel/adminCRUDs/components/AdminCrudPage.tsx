import { useCallback, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import type { AdminFormData, AdminId, AdminResource, AdminRow } from "../adminCrud.types";
import {
  createAdminResourceRow,
  deleteAdminResourceRow,
  fetchAdminResourceRows,
  updateAdminResourceRow,
} from "../model/adminCrud.thunks";

import AdminDataTable from "./AdminDataTable";
import ResourceFormDialog from "./ResourceFormDialog";

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
  return (
    <section>
      <div className="admin-header">
        <div>
          <h1>{resource.label}</h1>
          <p>Gestion des données administratives</p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedRow(null);
            setOpenForm(true);
          }}
        >
          Ajouter
        </button>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <AdminDataTable
        columns={resource.columns}
        rows={rows}
        idKey={resource.idKey}
        loading={loading}
        onEdit={(row) => {
          setSelectedRow(row);
          setOpenForm(true);
        }}
        onDelete={(row) => {
          const id = getRowId(row, resource.idKey);

          if (id !== null) {
            void handleDelete(Number(id));
          }
        }}
      />

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
