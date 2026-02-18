import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "@/utils/api";

import { toClientError } from "../funcs/toClientError";

type Reservation = {
  res_id: number;
  date_res_for: string;
  res_status: string;
  total_price: number;
  no_persons: number;
};

type UserOrdersState = {
  list: Reservation[];
  status: "idle" | "loading" | "succeeded" | "error";
  error: string | null;
};

const initialState: UserOrdersState = {
  list: [],
  status: "idle",
  error: null,
};
export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/orders/me");
      console.log("RESPONSE:", res.data);
      return res.data.data.rows;
    } catch (err) {
      return rejectWithValue(toClientError(err));
    }
  },
);
const ordersSlice = createSlice({
  name: "orders/slice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state) => {
        state.status = "error";
      });
  },
});
const userOrdersReducer = ordersSlice.reducer;
export { userOrdersReducer };
