import _contracts from "../../data/contracts.json";
import _chains from "../../data/chains.json";

export type ContractData = {
  chainId: number;
  factory: `0x${string}`;
};

export type ChainData = {
  id: number;
  name: string;
  imagePath: string;
};

const contracts: ContractData[] = _contracts as ContractData[];
const chains: ChainData[] = _chains;

export function loadContractData(chainId: number): ContractData {
  return contracts.filter((d: ContractData) => d.chainId === chainId)[0];
}

export function loadChainList(): ChainData[] {
  return chains;
}
