import _contracts from "../../data/contracts.json";

export type ContractData = {
  chainId: number;
  factory: `0x${string}`;
};

const contracts: ContractData[] = _contracts as ContractData[];

export function loadContractData(chainId: number): ContractData | undefined {
  return contracts.filter((d: ContractData) => d.chainId === chainId)[0];
}
