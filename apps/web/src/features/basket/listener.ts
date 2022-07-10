import { createListenerMiddleware } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { setupBasket } from "./slice";
import { fetchProducts } from "../products/slice";
import { Product } from "types";

export const basketListenerMiddleware = createListenerMiddleware();

basketListenerMiddleware.startListening({
  actionCreator: fetchProducts.fulfilled,
  effect: async (action: PayloadAction<Product[]>, listenerApi) => {
    listenerApi.dispatch(setupBasket(action.payload));
  },
});
