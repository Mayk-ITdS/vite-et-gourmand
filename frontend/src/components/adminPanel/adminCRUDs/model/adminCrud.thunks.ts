import type { AdminFormData, AdminId, AdminRow } from "../adminCrud.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import api from "@/utils/api";

type ResourceRef = {
  key: string;
  endpoint: string;
};

type FetchRowsPayload = {
  key: string;
  rows: AdminRow[];
};

type CreateRowArg = {
  resource: ResourceRef;
  data: AdminFormData;
};

type UpdateRowArg = {
  resource: ResourceRef;
  id: AdminId;
  data: AdminFormData;
};

type DeleteRowArg = {
  resource: ResourceRef;
  id: AdminId;
};

type AdminCrudError = {
  key: string;
  message: string;
};
export type {
  ResourceRef,
  FetchRowsPayload,
  CreateRowArg,
  UpdateRowArg,
  DeleteRowArg,
  AdminCrudError,
};
const getErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as { message?: string; error?: string } | undefined;

    return data?.message ?? data?.error ?? err.message ?? "Erreur lors de la requête";
  }

  if (err instanceof Error) {
    return err.message;
  }

  return "Erreur inconnue";
};

export const fetchAdminResourceRows = createAsyncThunk<
  FetchRowsPayload,
  ResourceRef,
  { rejectValue: AdminCrudError }
>("adminCrud/fetchRows", async ({ key, endpoint }, { rejectWithValue }) => {
  try {
    const response = await api.get(endpoint);

    return {
      key,
      rows: Array.isArray(response.data) ? response.data : (response.data.data ?? []),
    };
  } catch (err: unknown) {
    return rejectWithValue({
      key,
      message: getErrorMessage(err),
    });
  }
});

export const createAdminResourceRow = createAsyncThunk<
  { key: string },
  CreateRowArg,
  { rejectValue: AdminCrudError }
>("adminCrud/createRow", async ({ resource, data }, { rejectWithValue }) => {
  try {
    await api.post(resource.endpoint, data);

    return {
      key: resource.key,
    };
  } catch (err: unknown) {
    return rejectWithValue({
      key: resource.key,
      message: getErrorMessage(err),
    });
  }
});

export const updateAdminResourceRow = createAsyncThunk<
  { key: string },
  UpdateRowArg,
  { rejectValue: AdminCrudError }
>("adminCrud/updateRow", async ({ resource, id, data }, { rejectWithValue }) => {
  try {
    await api.patch(`${resource.endpoint}/${Number(id)}`, data);

    return {
      key: resource.key,
    };
  } catch (err: unknown) {
    return rejectWithValue({
      key: resource.key,
      message: getErrorMessage(err),
    });
  }
});

export const deleteAdminResourceRow = createAsyncThunk<
  { key: string },
  DeleteRowArg,
  { rejectValue: AdminCrudError }
>("adminCrud/deleteRow", async ({ resource, id }, { rejectWithValue }) => {
  try {
    await api.delete(`${resource.endpoint}/${id}`);

    return {
      key: resource.key,
    };
  } catch (err: unknown) {
    return rejectWithValue({
      key: resource.key,
      message: getErrorMessage(err),
    });
  }
});

type RunRowActionArg = {
  resourceKey: string;
  path: string;
  method: "patch" | "post" | "delete";
  body?: Record<string, unknown>;
};

export const runAdminRowAction = createAsyncThunk<
  { key: string },
  RunRowActionArg,
  { rejectValue: AdminCrudError }
>(
  "adminCrud/runRowAction",
  async ({ resourceKey, path, method, body }, { rejectWithValue }) => {
    try {
      if (method === "delete") {
        await api.delete(path);
      } else {
        await api[method](path, body ?? {});
      }

      return {
        key: resourceKey,
      };
    } catch (err: unknown) {
      return rejectWithValue({
        key: resourceKey,
        message: getErrorMessage(err),
      });
    }
  },
);
