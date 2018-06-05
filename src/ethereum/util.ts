import { SHA3 } from "crypto-js";

export const hexToNumber = (hex: string) => {
  if (hex === "0x") {
    return 0;
  }
  return Number.parseInt(hex);
};

export const numberToHex = (int: number) => {
  return "0x" + int.toString(16);
};

export const ERC20FuncSig = {
  allowance: "0xdd62ed3e",
  approve: "0x095ea7b3",
  balanceOf: "0x70a08231",
  decimals: "0x313ce567",
  name: "0x06fdde03",
  symbol: "0x95d89b41",
  totalSupply: "0x18160ddd",
  transfer: "0xa9059cbb",
  transferFrom: "0x23b872dd"
};

export const isAddress = (address: string) => {
  return /^(0x)?[0-9a-f]{40}$/.test(address.toLowerCase());
};

// Checks if the given string is a checksummed address
export const isChecksumAddress = (address: string) => {
  if (!isAddress(address)) {
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

export const sha3 = (message: string) => {
  return SHA3(message, { outputLength: 256 }).toString();
};

export const padAddress = (address: string) => {
  if (!isAddress(address)) {
    throw new Error("Not a valid address");
  }
  return "0".repeat(24) + address.replace("0x", "");
};

export const toUtf8 = (hex: string) => {
  return Buffer.from(hex.replace("0x", ""), "hex")
    .toString()
    .replace(/[\u0000-\u0040]/g, "");
};

export const addressNull = "0x0000000000000000000000000000000000000000";
