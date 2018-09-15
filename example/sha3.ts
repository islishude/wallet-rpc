import { SHA3 } from "crypto-js";
import { EthereumUtil } from "wallet-rpc";

export const sha3 = (message: string): string => {
  return SHA3(message, { outputLength: 256 }).toString();
};

// Checks if the given string is a checksum address
export const isChecksumAddress = (address: string) => {
  if (!EthereumUtil.isAddress(address)) {
    return false;
  }
  const aHash = sha3(address.replace("0x", "").toLowerCase());
  for (let i = 0; i < 40; i++) {
    const toNumber = Number.parseInt(aHash[i], 16);
    const upper = address[i].toUpperCase();
    if (
      (toNumber > 7 && upper !== address[i]) ||
      (toNumber <= 7 && upper !== address[i])
    ) {
      return false;
    }
  }
  return true;
};
