import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/utils/api";
import type { AdminDashboardPayload } from "@/types/adminAnalTypes";
import { toClientError } from "../funcs/toClientError";

interface AdminAnalyticsState {
  data: AdminDashboardPayload;
  loading: boolean;
  error: string | null;
}

const initialState: AdminAnalyticsState = {
  data: {
    overview: {
      totalRevenue: 0,
      totalOrders: 0,
      averageRevenue: 0,
      topMenuId: 0,
    },
    menus: [],
    months: [],
    statuses: [],
  },
  loading: false,
  error: null,
};

const fetchAdminDashboard = createAsyncThunk<
  AdminDashboardPayload,
  void,
  { rejectValue: string }
>("adminAnalytics/fetchDashboard", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<AdminDashboardPayload>("/admin/dashboard");
    return res.data;
  } catch (err) {
    return rejectWithValue(toClientError(err).message);
  }
});

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
