import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { fetchFromAPI } from "../../helpers";
import { StockLevel } from "types";

export interface StockLevelState {
  value: StockLevel;
  status: "idle" | "loading" | "failed";
}

const initialState: StockLevelState = {
  value: {},
  status: "idle",
};

export const initialAsync = createAsyncThunk(
  "stockLevels/fetchStockLevels",
  async () => {
    return await fetchFromAPI("stock-levels", { method: "GET" });
  }
);

export const stockLevelsSlice = createSlice({
  name: "stockLevels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initialAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(initialAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(initialAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const stockLevelsSelector = (state: RootState) =>
  state.stockLevels.value;

export const statusStockLevels = (state: RootState) => state.stockLevels.status;

export default stockLevelsSlice.reducer;
