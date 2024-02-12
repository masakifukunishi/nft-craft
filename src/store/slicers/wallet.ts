import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  chainId: "",
  accountAddress: "",
  signer: "",
  contractAddress: "",
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWallet: (state, action) => {
      state.chainId = action.payload.chainId;
      state.accountAddress = action.payload.accountAddress;
      state.signer = action.payload.signer;
      state.contractAddress = action.payload.contractAddress;
    },
  },
});

export const { setWallet } = walletSlice.actions;

export const selectWallet = (state: RootState) => state.wallet;

export default walletSlice.reducer;
