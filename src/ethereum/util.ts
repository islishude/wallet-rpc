import { SHA3 } from "crypto-js";
import { decode } from "utf8";

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

export const isAddress = address => {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    // check if it has the basic requirements of an address
    return false;
  } else if (
    /^(0x)?[0-9a-f]{40}$/.test(address) ||
    /^(0x)?[0-9A-F]{40}$/.test(address)
  ) {
    // If it's all small caps or all all caps, return true
    return true;
  } else {
    // Otherwise check each case
    return isChecksumAddress(address);
  }
};

// Checks if the given string is a checksummed address
export const isChecksumAddress = (address: string) => {
  address = address.replace("0x", "");
  const addressHash = sha3(address.toLowerCase());
  for (let i = 0; i < 40; i++) {
    if (
      (parseInt(addressHash[i], 16) > 7 &&
        address[i].toUpperCase() !== address[i]) ||
      (parseInt(addressHash[i], 16) <= 7 &&
        address[i].toLowerCase() !== address[i])
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
  address = address.replace("0x", "");
  const res = "0".repeat(24) + address;
  return res;
};

export let toUtf8 = (hex: string) => {
  let str = "";
  let i = 0;
  const l = hex.length;
  if (hex.substring(0, 2) === "0x") {
    i = 2;
  }
  for (; i < l; i += 2) {
    const code = parseInt(hex.substr(i, 2), 16);
    if (code === 0) {
      break;
    }
    str += String.fromCharCode(code);
  }
  return decode(str);
};
