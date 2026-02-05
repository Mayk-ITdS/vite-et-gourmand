import type { Menu } from "@/types/menus";
import api from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type MenuState = {
  data: Menu[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: MenuState = {
  data: [],
  status: "idle",
  error: null,
};

const fetchMenus = createAsyncThunk<Menu[], void, { rejectValue: string }>(
  "menus/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.request<{ data: Menu[] }>({
        url: "/menus",
        method: "GET",
      });
      console.log("PAYLOAD TYPE", response.data);

      return response.data.data;
    } catch (err) {
      console.warn(err);
      return rejectWithValue("Menu upload failed");
    }
  },
);

const menuSlice = createSlice({
  name: "menusSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        console.log("ACTION PAYLOAD", action.payload);
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "unknown error";
      });
  },
});

const menuReducer = menuSlice.reducer;

export { menuReducer, fetchMenus };
