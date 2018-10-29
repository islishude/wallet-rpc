import Axios from "axios";
import BigNumber from "bignumber.js";
import { IRpcResponse } from "../client";
import { IEthAbiStruct, IEtherScanAbiResponse } from "./rpc";

const hexPrefixReg = /0x/;
const zeroPadding = "0".repeat(24);
const isAddrReg = /^(0x)?[0-9a-fA-F]{40}$/;
const nonPrintCharReg = /[\u0000-\u001f]/g;

export class EthereumUtil {
  public static readonly gWei = new BigNumber(10).pow(9);

  public static readonly ERC20FuncSig = {
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

  public static readonly ERC20FuncSigUpper = {
    DECIMALS: "0x2e0f2625",
    NAME: "0xa3f4df7e",
    SYMBOL: "0xf76f8d78"
  };

  public static readonly ERC20EventSig = {
    Approve:
      "0xdf586a81df66595b89d3dbd58e5b14ee6c0fb16da8977f97ea7d24c654994ac7",
    Transfer:
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
  };

  public static readonly ERC721FunSig = {
    name: "0x06fdde03",
    // safeTransferFrom(address,address,uint256)
    safeTransferFrom: "0x42842e0e",
    // safeTransferFrom(address,address,uint256,bytes)
    safeTransferFromWithData: "0x42842e0e",
    symbol: "0x95d89b41",
    totalSupply: "0x18160ddd",
    // transferFrom(address,address,uint256)
    transferFrom: "0x23b872dd"
  };

  /**
   * address(0)
   */
  public static readonly addressNull =
    "0x0000000000000000000000000000000000000000";

  public static hexToNumber(hex: string): number {
    if (hex === "0x") {
      return 0;
    }
    return new BigNumber(hex, 16).toNumber();
  }

  /**
   * Get recommend gas price by `eth_gasPrice` RPC call from EtherScan.io
   * @param apiKey you EtherScan API key
   */
  public static async getRecommendGasPrice(apiKey: string = "YourApiKeyToken") {
    const api: string = "https://api.etherscan.io/api";
    const { data } = await Axios.get<IRpcResponse<string>>(api, {
      params: {
        action: "eth_gasPrice",
        apiKey,
        module: "proxy"
      }
    });
    const tmp = new BigNumber(data.result).div(EthereumUtil.gWei);
    if (tmp.lt(5)) {
      return "5";
    }
    if (tmp.lt(10)) {
      return "10";
    }
    if (tmp.lt(20)) {
      return "20";
    }
    return tmp.times(1.2).toFixed(0);
  }

  /**
   * Pad ethereum address to 64 bits hex string without 0x
   * Can be use for ERC20 transfer call and ERC20 balance call
   * @param address
   */
  public static padAddress(address: string): string {
    if (!EthereumUtil.isAddress(address)) {
      throw new Error("Not a valid address");
    }
    return zeroPadding + address.replace("0x", "");
  }

  /**
   * transform Hex string to UTF8-encoding and trim string
   * @param hex hex string that can be prefix with `0x`
   */
  public static toUtf8(hex: string): string {
    return Buffer.from(hex.replace(hexPrefixReg, ""), "hex")
      .toString()
      .replace(nonPrintCharReg, "")
      .trim();
  }

  /**
   * validate eth address
   * @param address a checked eth address or not
   */
  public static isAddress(address: string): boolean {
    return isAddrReg.test(address.toLowerCase());
  }

  /**
   * add `0x` to hex string
   * if param starts with `0x` would return origin
   */
  public static addHexPad(hex: string): string {
    if (!hex.startsWith("0x")) {
      hex = "0x" + hex;
    }
    return hex;
  }
  /**
   * Get Eth Token ABI from EtherScan.io
   * @param token tokenAddress
   * @returns { status: string, message: string, result: string}
   * if status isn't "1" then the request is failed
   * the result is ABI JSON string,you should use JSON.parse()
   * type defined of ABI struct can be found in
   * defined/eth.d.ts  Ethereum.IAbiStruct
   */
  public static async getABI(
    token: string,
    apiKey: string = "YourApiKeyToken"
  ): Promise<IEthAbiStruct[] | null> {
    const api: string = "https://api.etherscan.io/api";

    try {
      const { data } = await Axios.get<IEtherScanAbiResponse>(api, {
        params: {
          action: "getabi",
          address: token,
          apiKey,
          module: "contract"
        }
      });

      if (data.status === "0") {
        return null;
      }

      return JSON.parse(data.result) as IEthAbiStruct[];
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public static hexToDecimalString(hex: string): string {
    if (hex === "0x") {
      return "0";
    }
    if (!hex.startsWith("0x")) {
      hex = "0x" + hex;
    }
    return new BigNumber(hex).toString(10);
  }

  public static toWei(eth: number): string {
    const tmp = new BigNumber(10).pow(18);
    return new BigNumber(eth).times(tmp).toString(10);
  }

  public static toEth(wei: string): string {
    const tmp = new BigNumber(10).pow(18);
    return new BigNumber(wei).div(tmp).toString(10);
  }

  public static numberToHex(int: number): string {
    return "0x" + new BigNumber(int).toString(16);
  }
}
