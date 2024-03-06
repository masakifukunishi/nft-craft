import { configureStore } from "@reduxjs/toolkit";
import authModalReducer from "./slicers/authModal";
export const store = configureStore({
  reducer: {
    authModal: authModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
