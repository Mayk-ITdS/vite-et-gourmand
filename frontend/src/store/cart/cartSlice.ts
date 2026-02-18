import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { MenuWithGallery } from "@/types/menus";

interface CartItem {
  menuId: number;
  quantity: number;
  menuData: MenuWithGallery;
}

interface CartState {
  items: CartItem[];
  isStepperOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isStepperOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (item) => item.menuId === action.payload.menuId,
      );

      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.menuId !== action.payload,
      );
    },

    openStepper: (state) => {
      state.isStepperOpen = true;
    },

    closeStepper: (state) => {
      state.isStepperOpen = false;
    },
  },
});

export const { addToCart, removeFromCart, openStepper, closeStepper } =
  cartSlice.actions;

export default cartSlice.reducer;
