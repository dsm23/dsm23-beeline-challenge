import { createListenerMiddleware } from "@reduxjs/toolkit";
import type { TypedStartListening } from "@reduxjs/toolkit";
import { basketSelector, incrementBasket } from "../basket/slice";
import { calculateTotal } from "./slice";
import { dictProducts } from "../products/slice";
import { AppDispatch, RootState } from "../../app/store";

export const totalListenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

const startAppListening =
  totalListenerMiddleware.startListening as AppStartListening;

startAppListening({
  actionCreator: incrementBasket,
  effect: (_, listenerApi) => {
    const products = dictProducts(listenerApi.getState());
    const basket = basketSelector(listenerApi.getState());

    listenerApi.dispatch(
      calculateTotal({
        products,
        basket,
      })
    );
  },
});
