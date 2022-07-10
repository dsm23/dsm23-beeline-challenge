import { configureStore } from "@reduxjs/toolkit";
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import basketReducer from "../features/basket/slice";
import { basketListenerMiddleware } from "../features/basket/listener";
import productsReducer from "../features/products/slice";
import stockLevelsReducer from "../features/stock-levels/slice";
import totalReducer from "../features/total/slice";
import { totalListenerMiddleware } from "../features/total/listener";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    products: productsReducer,
    stockLevels: stockLevelsReducer,
    total: totalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      basketListenerMiddleware.middleware,
      totalListenerMiddleware.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
