import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import api from "@/utils/api";
import type { ClientError } from "@/types/errors";
import type { MenuWithGallery } from "@/types/menus";

import { toClientError } from "../funcs/toClientError";
import type { RootState } from "../store";

import type { OrderDraft } from "./orderTypes";

type CreateOrderDTO = {
  menus: {
    menuId: number;
    quantity: number;
  }[];
  prestation: {
    address: string;
    city: string;
    date: string;
    time: string;
  };
};

interface Prestation {
  address: string;
  city: string;
  date: string;
  time: string;
  distanceKm: number;
}
interface OrderState extends OrderDraft {
  selectedMenu: MenuWithGallery | "";
  prestation: Prestation;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: ClientError | null;
  step: number;
}
const initialState: OrderState = {
  order: {
    menu_id: [],
    menu_name: [],
    unitPrice: 0,
    minPersons: 0,
    persons: 0,
    suivi: {
      status: [],
    },
  },
  client: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  prestation: {
    address: "",
    city: "",
    date: "",
    time: "",
    distanceKm: 0,
  },
  pricing: {
    base: 0,
    discount: 0,
    delivery: 0,
    ht: 0,
    tva: 0,
    ttc: 0,
  },
  status: "idle",
  error: null,
  step: 0,
  selectedMenu: "",
};

export const postOrders = createAsyncThunk<
  OrderDraft,
  void,
  { rejectValue: ClientError }
>("orders/post", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    console.log(state);
    const orderState = state.orders;

    const payload: CreateOrderDTO = {
      menus: [
        {
          menuId: Number(orderState.order.menu_id),
          quantity: orderState.order.persons,
        },
      ],
      prestation: {
        address: orderState.prestation.address,
        city: orderState.prestation.city,
        date: orderState.prestation.date,
        time: orderState.prestation.time,
      },
    };
    console.log("SENDING DTO:", payload);
    const res = await api.request({
      url: "/orders/me",
      method: "POST",
      data: payload,
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(toClientError(err));
  }
});

const orderSlice = createSlice({
  name: "order/slice",
  initialState: initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    startOrderFromMenu(state, action: PayloadAction<MenuWithGallery>) {
      const menu = action.payload;

      state.selectedMenu = menu;

      state.order.menu_id = Number(menu.menu_id);
      state.order.menu_name = menu.menu_name;
      state.order.unitPrice = Number(menu.prix_unitaire);
      state.order.minPersons = Number(menu.min_persons);
      state.order.persons = Number(menu.min_persons);

      state.pricing.base = Number(menu.prix_unitaire);
      state.pricing.ht = Number(menu.prix_unitaire);
      state.pricing.ttc = Number(menu.prix_unitaire);

      state.step = 0;
    },
    setClientInfo(state, action: PayloadAction<typeof state.client>) {
      state.client = action.payload;
    },

    setPersons(state, action: PayloadAction<number>) {
      const persons = action.payload;
      const min = state.order.minPersons;

      if (persons < min) return;

      state.order.persons = persons;

      const base = persons * state.order.unitPrice;
      let discount = 0;

      if (persons >= min + 5) {
        discount = base * 0.1;
      }

      state.pricing.base = base;
      state.pricing.discount = discount;
      state.pricing.ht = base - discount;
      state.pricing.tva = state.pricing.ht * 0.1;
      state.pricing.ttc =
        state.pricing.ht + state.pricing.tva + state.pricing.delivery;
    },
    setPrestation(state, action: PayloadAction<Prestation>) {
      state.prestation = action.payload;

      const { city, distanceKm } = action.payload;

      let delivery = 0;

      if (city.toLowerCase() !== "bordeaux") {
        delivery = 5 + distanceKm * 0.59;
      }

      state.pricing.delivery = delivery;

      state.pricing.ttc = state.pricing.ht + state.pricing.tva + delivery;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postOrders.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(postOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? {
          kind: "unknown",
          message: "Uknown error",
        };
      });
  },
});

export const { setStep } = orderSlice.actions;
export const ordersReducer = orderSlice.reducer;
export const { startOrderFromMenu } = orderSlice.actions;
export const { setClientInfo, setPrestation, setPersons } = orderSlice.actions;
