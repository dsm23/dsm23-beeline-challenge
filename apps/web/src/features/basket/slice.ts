import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState, AppThunk } from "../../app/store";
import { stockLevelsSelector } from "../stock-levels/slice";
import { Product } from "types";

export type BasketState = {
  value: Record<string, number>;
};

const initialState: BasketState = {
  value: {},
};

export const setupBasket = createAction<Product[]>("basket/setupBasket");

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    incrementBasket: (state: BasketState, action: PayloadAction<string>) => {
      state.value[action.payload] += 1;
    },

    removeFromBasket: (state, action: PayloadAction<string>) => {
      if (state.value[action.payload] > 0) {
        state.value[action.payload] -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setupBasket, (state, action) => {
      const products = action.payload;

      state.value = products.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.name]: 0,
        }),
        {}
      );
    });
  },
});

export const { incrementBasket, removeFromBasket } = basketSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const basketSelector = (state: RootState) => state.basket.value;

export const addToBasket =
  (name: string): AppThunk =>
  (dispatch, getState) => {
    const stockLevels = stockLevelsSelector(getState());
    const basket = basketSelector(getState());

    if (stockLevels[name] > basket[name]) {
      dispatch(incrementBasket(name));
    }
  };

export default basketSlice.reducer;
