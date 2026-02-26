import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { ordersReducer } from "./orders/orderSlice";
import { authReducer } from "./menus/authSlice";
import { menuReducer } from "./menus/menusSlice";
import { userOrdersReducer } from "./orders/userOrdersSlice";
import { userProfileReducer } from "./slices/userProfileSlice";
import analReducer from "./slices/adminAnalyticsSlice";
const rootReducer = combineReducers({
  menus: menuReducer,
  auth: authReducer,
  orders: ordersReducer,
  userOrders: userOrdersReducer,
  profile: userProfileReducer,
  adminAnalytics: analReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
