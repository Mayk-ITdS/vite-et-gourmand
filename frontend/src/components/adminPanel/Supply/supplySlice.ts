import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { toClientError } from "@/store/funcs/toClientError";
import type { ClientError } from "@/types/errors";

export type ProductDTO = {
  id: number;
  product_name: string;
  producer_name: string;
  product_type: "raw" | "semi" | "finished";
  arrival_date: string;
  expiration_date: string;
  quantity: string;
  status: string;
};
type ProductsState = {
  rows: ProductDTO[];
  loading: boolean;
  error: ClientError | null;
};

const initialState: ProductsState = {
  rows: [],
  loading: false,
  error: null,
};
const fetchProducts = createAsyncThunk<ProductDTO[], void, { rejectValue: ClientError }>(
  "stock/fetchproducts",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.get<ProductDTO[]>("/admin/products");
      return result.data;
    } catch (e) {
      return rejectWithValue(toClientError(e));
    }
  },
);
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? {
          message: "Erreur lors du chargement des produits.",
          kind: "unknown",
        };
      });
  },
});
const productReducer = productSlice.reducer;
export default productReducer;
export { fetchProducts };
