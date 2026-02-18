import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { ClientError } from "@/types/errors";
import api, { setAuthToken } from "@/utils/api";

import { toClientError } from "../funcs/toClientError";


/* =======================
   TYPES
======================= */
type RegisterPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  houseNumber: number;
  city: string;
  street: string;
  zipCode: string;
  country: string;
};

type LoginPayload = {
  email: string;
  password: string;
};
type AuthResponse = {
  token: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: "user" | "admin";
  } | null;
};

type AuthState = {
  token: string | null;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: "user" | "admin" | "employee";
  } | null;
  status: "idle" | "loading" | "authenticated" | "error";
  error: ClientError | null;
};

/* =======================
   INITIAL STATE
======================= */
const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

/* =======================
   THUNKS
======================= */

const loginUser = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: ClientError }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.request<AuthResponse>({
      url: "/auth/login",
      method: "POST",
      data: payload,
    });

    return res.data;
  } catch (e) {
    return rejectWithValue(toClientError(e));
  }
});

const registerUser = createAsyncThunk<
  AuthState,
  RegisterPayload,
  { rejectValue: ClientError }
>("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.request<AuthState>({
      url: "/auth/register",
      method: "POST",
      data: payload,
    });

    return res.data;
  } catch (err) {
    return rejectWithValue(toClientError(err));
  }
});

/* =======================
   SLICE
======================= */
const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.token = action.payload.token;

        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? null;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.token = action.payload.token;
        state.user = action.payload.user;
        setAuthToken(action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? null;
      });
  },
});
const { logout } = authSlice.actions;
const authReducer = authSlice.reducer;
export {
  logout,
  authReducer,
  registerUser,
  loginUser,
  type LoginPayload,
  type RegisterPayload,
};
