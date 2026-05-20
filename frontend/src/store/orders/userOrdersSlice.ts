import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { toClientError } from "../funcs/toClientError";
import type { ClientError } from "@/types/errors";

const initialState: UserOrdersState = {
  list: [],
  status: "idle",
  error: null,
};
export type UserOrderDTO = {
  resId: number;
  noPersons: number;
  eventName: string;
  equipmentLoaned: boolean;
  equipmentReturned: boolean;
  eventDate: string;
  totalPrice: number;
  menuId: number;
  unitPriceSnapshot: number;
  theme: string | null;
  history: {
    status: "pending" | "confirmed" | "cancelled" | "completed";
    changedAt: string;
    changedBy: number;
  }[];
};
type UserOrdersState = {
  list: UserOrderDTO[];
  status: "idle" | "loading" | "succeeded" | "error";
  error: string | null;
};
export const fetchMyOrders = createAsyncThunk<
  UserOrderDTO[],
  void,
  { rejectValue: ClientError }
>("orders/fetchMyOrders", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/orders/me");
    console.log("RESPONSE:", res.data);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(toClientError(err));
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
export { userOrdersReducer };
