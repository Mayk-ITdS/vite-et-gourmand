import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/utils/api";
import type { AdminDashboardPayload } from "@/types/adminAnalTypes";

interface AdminAnalyticsState {
  data: AdminDashboardPayload | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminAnalyticsState = {
  data: null,
  loading: false,
  error: null,
};

const fetchAdminDashboard = createAsyncThunk(
  "adminAnalytics/fetchDashboard",
  async () => {
    const res = await api.get("/admin/dashboard");
    return res.data as AdminDashboardPayload;
  },
);

const analyticSlice = createSlice({
  name: "adminAnalytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Dashboard fetch failed";
      });
  },
});

const analReducer = analyticSlice.reducer;
export default analReducer;
export { fetchAdminDashboard };
