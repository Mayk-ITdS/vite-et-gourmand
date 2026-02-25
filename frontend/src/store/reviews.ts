import type { ClientError } from "@/types/errors";
import api from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toClientError } from "./funcs/toClientError";
import type { ReviewUser } from "@/types/avis";
// import type { RootState } from "./store";
export interface CreateReviewPayload {
  orderId: number;
  pseudo: string;
  content: string;
  score: number;
  avatar?: string | null;
}
const fetchReviews = createAsyncThunk<
  ReviewUser[],
  void,
  { rejectValue: ClientError }
>("fetch/reviews", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/reviews/public");
    // const state = getState() as RootState;
    return response.data;
  } catch (err) {
    return rejectWithValue(toClientError(err));
  }
});
export const createReview = createAsyncThunk<
  void,
  { resId: number; payload: CreateReviewPayload },
  { rejectValue: ClientError }
>("reviews/create", async ({ resId, payload }, { rejectWithValue }) => {
  try {
    await api.post(`/reviews/${resId}`, payload);
  } catch (err) {
    return rejectWithValue(toClientError(err));
  }
});
interface ReviewsState {
  status: "idle" | "loading" | "succeeded" | "failed";
  createStatus: "idle" | "loading" | "succeeded" | "failed";
  data: ReviewUser[];
  error: ClientError | null;
}
const initialState: ReviewsState = {
  status: "idle",
  createStatus: "idle",
  error: null,
  data: [],
};
const reviewsSlice = createSlice({
  name: "reviews/slice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? {
          kind: "unknown",
          message: "Uknown error",
        };
      })
      .addCase(createReview.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createReview.fulfilled, (state) => {
        state.createStatus = "succeeded";
      })
      .addCase(createReview.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload ?? {
          kind: "unknown",
          message: "Unknown error",
        };
      });
  },
});
const reviewsReducer = reviewsSlice.reducer;
export { reviewsReducer, reviewsSlice, fetchReviews };
