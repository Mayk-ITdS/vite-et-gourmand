import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { MenuWithGallery } from "@/types/menus";
import api from "@/utils/api";

type MenuState = {
  list: {
    data: MenuWithGallery[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  details: {
    data: MenuWithGallery | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
};

const initialState: MenuState = {
  list: {
    data: [],
    status: "idle",
    error: null,
  },
  details: {
    data: null,
    status: "idle",
    error: null,
  },
};

const fetchMenus = createAsyncThunk<
  MenuWithGallery[],
  void,
  { rejectValue: string }
>("menus/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await api.request<{ data: MenuWithGallery[] }>({
      url: "/menus",
      method: "GET",
    });

    return response.data.data;
  } catch (err) {
    console.warn(err);
    return rejectWithValue("Menu upload failed");
  }
});

const fetchMenuById = createAsyncThunk<
  MenuWithGallery,
  number,
  { rejectValue: string }
>("menus/fetchMenuById", async (id, { rejectWithValue }) => {
  try {
    const response = await api.request<{ data: MenuWithGallery }>({
      url: `/menus/${id}`,
      method: "GET",
    });
    return response.data.data;
  } catch (err) {
    console.warn(err);
    return rejectWithValue("");
  }
});

const menuSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    clearMenuDetails(state) {
      state.details.data = null;
      state.details.status = "idle";
      state.details.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LIST
      .addCase(fetchMenus.pending, (state) => {
        state.list.status = "loading";
        state.list.error = null;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.list.status = "succeeded";
        state.list.data = action.payload;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.list.status = "failed";
        state.list.error = action.payload ?? "unknown error";
      })
      .addCase(fetchMenuById.pending, (state) => {
        state.details.status = "loading";
        state.details.error = null;
      })
      .addCase(fetchMenuById.fulfilled, (state, action) => {
        state.details.status = "succeeded";
        state.details.data = action.payload;
      })
      .addCase(fetchMenuById.rejected, (state, action) => {
        state.details.status = "failed";
        state.details.error = action.payload ?? "unknown error";
      });
  },
});
export { fetchMenus, fetchMenuById };
export const { clearMenuDetails } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
