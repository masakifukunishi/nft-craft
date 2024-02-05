import _contracts from "../../data/contracts.json";

export type ContractData = {
  chainId: number;
  factory: string;
};

const contracts: ContractData[] = _contracts;

export function loadContractData(chainId: number): ContractData | undefined {
  return contracts.filter((d: ContractData) => d.chainId === chainId)[0];
}
