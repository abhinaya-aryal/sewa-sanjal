import { Address } from "@shared/types/address";

export const parseAddress = (address: Address): string => {
  return `${address?.local && address?.local}, ${address?.district && address?.district}`;
};
