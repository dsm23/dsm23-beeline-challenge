import { createAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "types";
import type { RootState } from "../../app/store";

export interface TotalState {
  value: number;
}

const initialState: TotalState = {
  value: 0,
};

export const calculateTotal = createAction<{
  products: Record<string, Product>;
  basket: Record<string, number>;
}>("total/calculate");

export const slice = createSlice({
  name: "total",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(calculateTotal, (state, action) => {
      const { basket, products } = action.payload;

      let total = 0;

      for (const [item, numInBasket] of Object.entries(basket)) {
        total += numInBasket * products[item].price;
      }

      state.value = total;
    });
  },
});

export const totalSelector = (state: RootState) => state.total.value;

export default slice.reducer;
