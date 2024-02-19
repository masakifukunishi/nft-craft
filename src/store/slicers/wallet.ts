import { createSlice } from "@reduxjs/toolkit";
import type { Signer } from "ethers";
import { RootState } from "../store";

type WalletState = {
  chainId: number;
  accountAddress: string;
  signer: Signer | null;
  contractAddress: string;
};

const initialState: WalletState = {
  chainId: 0,
  accountAddress: "",
  signer: null,
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
    setChainId: (state, action) => {
      state.chainId = action.payload.chainId;
    },
  },
});

export const { setWallet, setChainId } = walletSlice.actions;

export const selectWallet = (state: RootState) => state.wallet;

export default walletSlice.reducer;
