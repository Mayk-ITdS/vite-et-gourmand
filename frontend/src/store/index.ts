import { configureStore } from "@reduxjs/toolkit";
import { menuReducer } from "./menus/menusSlice";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    menus: menuReducer,
  },
});

export { store };
