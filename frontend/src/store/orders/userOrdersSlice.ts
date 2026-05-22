import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { toClientError } from "../funcs/toClientError";
import type { ClientError } from "@/types/errors";
import type { CancelOrderResponse, UserOrderDTO } from "./orderTypes";

type UserOrdersState = {
  list: UserOrderDTO[];
  status: "idle" | "loading" | "succeeded" | "error";
  error: string | null;
};

const initialState: UserOrdersState = {
  list: [],
  status: "idle",
  error: null,
};

export const fetchMyOrders = createAsyncThunk<
  UserOrderDTO[],
  void,
  { rejectValue: ClientError }
>("orders/fetchMyOrders", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/orders/me");
    return res.data.data;
  } catch (err) {
    return rejectWithValue(toClientError(err));
  }
});

export const cancelOrder = createAsyncThunk<
  CancelOrderResponse,
  number,
  { rejectValue: ClientError }
>("orders/cancel", async (orderId, { rejectWithValue }) => {
  try {
    const result = await api.patch(`/orders/me/${orderId}/cancel`);
    return result.data;
  } catch (e) {
    rejectWithValue(toClientError(e));
  }
});

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
export { userOrdersReducer, type UserOrderDTO };
