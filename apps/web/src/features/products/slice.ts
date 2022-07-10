import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState, AppThunk } from "../../app/store";
import { fetchFromAPI } from "../../helpers";
import { setupBasket } from "../basket/slice";
import { Product } from "types";

export interface ProductsState {
  value: Product[];
  dictValue: Record<string, Product>;
  status: "idle" | "loading" | "failed";
}

const initialState: ProductsState = {
  value: [],
  dictValue: {},
  status: "idle",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return await fetchFromAPI("products", { method: "GET" });
  }
);

export const productsSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const products = action.payload as Product[];

        state.status = "idle";
        state.value = products;
        state.dictValue = products.reduce(
          (acc, cur) => ({
            ...acc,
            [cur.name]: cur,
          }),
          {}
        );
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const dictProducts = (state: RootState) => state.products.dictValue;
export const listProducts = (state: RootState) => state.products.value;
export const statusProducts = (state: RootState) => state.products.status;

export default productsSlice.reducer;
