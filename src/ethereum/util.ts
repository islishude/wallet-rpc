import Axios from "axios";
import BigNumber from "bignumber.js";
import { IEthAbiStruct, IEtherScanAbiResponse } from "./rpc";

export const hexToNumber = (hex: string): number => {
  if (hex === "0x") {
    return 0;
  }
  return Number.parseInt(hex, 16);
};

export const hexToDecimalString = (hex: string): string => {
  if (hex === "0x") {
    return "0";
  }
  if (!hex.startsWith("0x")) {
    hex = "0x" + hex;
  }
  return new BigNumber(hex).toString(10);
};

export const toWei = (eth: number): string => {
  const tmp = new BigNumber(10).pow(18);
  return new BigNumber(eth).times(tmp).toString(10);
};

export const toEth = (wei: string): string => {
  const tmp = new BigNumber(10).pow(18);
  return new BigNumber(wei).div(tmp).toString(10);
};

export const numberToHex = (int: number): string => {
  return "0x" + new BigNumber(int).toString(16);
};

export const addHexPad = (hex: string): string => {
  if (!hex.startsWith("0x")) {
    hex = "0x" + hex;
  }
  return hex;
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

export const ERC20FuncSigUpper = {
  DECIMALS: "0x2e0f2625",
  NAME: "0xa3f4df7e",
  SYMBOL: "0xf76f8d78"
};

export const ERC20EventSig = {
  Approve: "0xdf586a81df66595b89d3dbd58e5b14ee6c0fb16da8977f97ea7d24c654994ac7",
  Transfer: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
};

export const ERC721FunSig = {
  name: "0x06fdde03",
  symbol: "0x95d89b41",
  totalSupply: "0x18160ddd",
  // safeTransferFrom(address,address,uint256)
  safeTransferFrom: "0x42842e0e",
  // safeTransferFrom(address,address,uint256,bytes)
  safeTransferFromWithData: "0x42842e0e",
  // transferFrom(address,address,uint256)
  transferFrom: "0x23b872dd"
};

export const isAddress = (address: string): boolean => {
  return /^(0x)?[0-9a-f]{40}$/.test(address.toLowerCase());
};

export const padAddress = (address: string): string => {
  if (!isAddress(address)) {
    throw new Error("Not a valid address");
  }
  return "0".repeat(24) + address.replace("0x", "");
};

export const toUtf8 = (hex: string): string => {
  const result = Buffer.from(hex.replace("0x", ""), "hex")
    .toString()
    .match(/\w+/g);
  return result ? result.join("") : "";
};

export const addressNull = "0x0000000000000000000000000000000000000000";

/**
 * Get Eth Token ABI from EtherScan.io
 * @param token tokenAddress
 * @returns { status: string, message: string, result: string}
 * if status isn't "1" then the request is failed
 * the result is ABI JSON string,you should use JSON.parse()
 * type defined of ABI struct can be found in
 * defined/eth.d.ts => Ethereum.IAbiStruct
 */
export const getABI = async (
  token: string,
  apiKey: string = "YourApiKeyToken"
): Promise<IEthAbiStruct[] | null> => {
  const api: string = "https://api.etherscan.io/api";

  try {
    const { data } = await Axios.get<IEtherScanAbiResponse>(api, {
      params: {
        module: "contract",
        action: "getabi",
        address: token,
        apiKey
      }
    });

    if (data.status === "0") {
      return null;
    }

    return JSON.parse(data.result) as IEthAbiStruct[];
  } catch (e) {
    throw new Error(e.message);
  }
};
