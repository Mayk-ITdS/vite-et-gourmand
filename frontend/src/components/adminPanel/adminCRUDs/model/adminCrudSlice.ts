import { createSlice } from "@reduxjs/toolkit";
import { fetchAdminResourceRows } from "./adminCrud.thunks";
import type { AdminRow } from "../adminCrud.types";

type AdminCrudState = {
  rowsByResource: Record<string, AdminRow[]>;
  loadingByResource: Record<string, boolean>;
  errorByResource: Record<string, string | null>;
};

const initialState: AdminCrudState = {
  rowsByResource: {},
  loadingByResource: {},
  errorByResource: {},
};

const adminCrudSlice = createSlice({
  name: "adminCrud",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminResourceRows.pending, (state, action) => {
        const key = action.meta.arg.key;
        state.loadingByResource[key] = true;
        state.errorByResource[key] = null;
      })
      .addCase(fetchAdminResourceRows.fulfilled, (state, action) => {
        const { key, rows } = action.payload;
        state.rowsByResource[key] = rows;
        state.loadingByResource[key] = false;
      })
      .addCase(fetchAdminResourceRows.rejected, (state, action) => {
        const payload = action.payload as { key: string; message: string };

        state.loadingByResource[payload.key] = false;
        state.errorByResource[payload.key] =
          action.payload?.message ?? "Erreur de chargement";
      });
  },
});

const adminCrudReducer = adminCrudSlice.reducer;
export default adminCrudReducer;
