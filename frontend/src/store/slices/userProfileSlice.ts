import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "@/utils/api";
import { type Profile } from "@/types/UserProps";
import { toClientError } from "../funcs/toClientError";

interface ProfileState {
  data: Profile | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  status: "idle",
  error: null,
};
export const fetchMyProfile = createAsyncThunk("profile/fetch", async () => {
  const res = await api.get("/users/me");
  return res.data;
});

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (
    data: {
      firstName: string;
      lastName: string;
      phone: string;
      city: string;
      country: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const res = await api.put("/users/me", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(toClientError(err));
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const userProfileReducer = profileSlice.reducer;
