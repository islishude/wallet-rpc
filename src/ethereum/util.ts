import Axios from "axios";
import { IEthAbiStruct, IEtherScanAbiResponse } from "./type";

const addrPadding = "000000000000000000000000";
const isAddrReg = /^(0x)?[0-9a-fA-F]{40}$/;

export class EthereumUtil {
  public static readonly ERC20FuncSig = {
    allowance: "0xdd62ed3e",
    approve: "0x095ea7b3",
    balanceOf: "0x70a08231",
    decimals: "0x313ce567",
    name: "0x06fdde03",
    symbol: "0x95d89b41",
    totalSupply: "0x18160ddd",
    transfer: "0xa9059cbb",
    transferFrom: "0x23b872dd",
  };

  public static readonly ERC20FuncSigUpper = {
    DECIMALS: "0x2e0f2625",
    NAME: "0xa3f4df7e",
    SYMBOL: "0xf76f8d78",
  };

  public static readonly ERC20EventSig = {
    Approve:
      "0xdf586a81df66595b89d3dbd58e5b14ee6c0fb16da8977f97ea7d24c654994ac7",
    Transfer:
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
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
    transferFrom: "0x23b872dd",
  };

  /**
   * address(0)
   */
  public static readonly addressNull: string =
    "0x0000000000000000000000000000000000000000";

  /**
   * Pad ethereum address to 64 bits hex string without 0x prefix
   * Can be use for ERC20 transfer call and ERC20 balance call
   */
  public static padAddress(address: string): string {
    if (!EthereumUtil.isAddress(address)) {
      throw new Error("Not a valid address");
    }
    if (address.startsWith("0x") || address.startsWith("0X")) {
      address = address.slice(2);
    }
    return addrPadding + address;
  }

  /**
   * transform Hex string to UTF8-encoding and trim string
   * @param raw hex string that can be prefix with `0x`
   */
  public static toUtf8(raw: string): string {
    if (raw.length > 2 && (raw.startsWith("0x") || raw.startsWith("0X"))) {
      raw = raw.slice(2);
    }
    return Buffer.from(raw, "hex")
      .toString()
      .replace(/[\u0000-\u001f]/g, "")
      .trim();
  }

  public static decodeABIString(raw: string): string {
    raw = EthereumUtil.rmHexPrefix(raw);
    const data = raw.substr(128, Number.parseInt(raw.substr(64, 64), 16) * 2);
    return Buffer.from(data, "hex").toString();
  }

  public static decodeABINumber(raw: string): number {
    return Number.parseInt(raw, 16);
  }

  /**
   * check eth address is valid or not
   */
  public static isAddress(address: string): boolean {
    return isAddrReg.test(address.toLowerCase());
  }

  /**
   * add `0x` prefix to hex string
   * if param starts with `0x` would return origin
   */
  public static addHexPrefix(hex: string): string {
    if (!hex.startsWith("0x")) {
      hex = "0x" + hex;
    }
    return hex;
  }

  /**
   * Get Eth Token ABI from EtherScan.io
   * if status isn't "1" then the request is failed
   * the result is ABI JSON string,you should use JSON.parse()
   * type defined of ABI struct can be found in
   * defined/eth.d.ts  Ethereum.IAbiStruct
   */
  public static async getABI(
    token: string,
    apiKey: string = "YourApiKeyToken",
  ): Promise<IEthAbiStruct[] | null> {
    const api: string = "https://api.etherscan.io/api";

    try {
      const { data } = await Axios.get<IEtherScanAbiResponse>(api, {
        params: {
          action: "getabi",
          address: token,
          apiKey,
          module: "contract",
        },
      });

      if (data.status === "0") {
        return null;
      }

      return JSON.parse(data.result) as IEthAbiStruct[];
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public static rmHexPrefix(raw: string): string {
    if (raw.length >= 2 && (raw.startsWith("0x") || raw.startsWith("0X"))) {
      raw = raw.slice(2);
    }
    return raw;
  }
}
