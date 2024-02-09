import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./slicers/wallet";
export const store = configureStore({
  reducer: {
    wallet: walletReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
