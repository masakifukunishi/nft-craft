import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

const initialState = {
  isOpen: false,
  // isShouldCloseOnOverlayClick: true,
};

const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    setModalState: (state, action) => {
      state.isOpen = action.payload.isOpen;
      // state.isShouldCloseOnOverlayClick = action.payload.isShouldCloseOnOverlayClick;
    },
  },
});

export const { setModalState } = authModalSlice.actions;

export const selectModalState = (state: RootState) => state.authModal;

export default authModalSlice.reducer;
