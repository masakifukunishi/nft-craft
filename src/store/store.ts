import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./slicers/wallet";
export const store = configureStore({
  reducer: {
    wallet: walletReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["wallet/setWallet"],
        ignoredPaths: ["wallet.signer"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
