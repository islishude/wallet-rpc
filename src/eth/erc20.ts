import { IJsonRpcResponse } from "../jsonrpc/imsg";
import { GethClient } from "./geth";
import { BlockParam, IEthCallFuncParam } from "./types";

const ERC20FuncSig = {
  DECIMALS: "0x2e0f2625",
  NAME: "0xa3f4df7e",
  SYMBOL: "0xf76f8d78",

  // standard call func sigs
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

const ERC20EventSig = {
  Approve: "0xdf586a81df66595b89d3dbd58e5b14ee6c0fb16da8977f97ea7d24c654994ac7",
  Transfer: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
};

export function decodeAbiString(raw: string): string {
  if (raw.startsWith("0x") || raw.startsWith("0X")) {
    raw = raw.slice(2);
  }
  const data = raw.substr(128, Number.parseInt(raw.substr(64, 64), 16) * 2);
  return Buffer.from(data, "hex").toString();
}

export function decodeAbiNumber(raw: string): number {
  return Number.parseInt(raw, 16);
}

export class ERC20Client {
  public static readonly FuncSig = ERC20FuncSig;
  public static readonly EventSig = ERC20EventSig;

  constructor(private rpc: GethClient) {}

  public async balanceOf(
    token: string,
    address: string,
    status: BlockParam = "latest",
  ) {
    if (address.startsWith("0x") || address.startsWith("0X")) {
      address = address.slice(2);
    }
    // padding address to 32bytes
    address = address.padStart(24, "0");
    const data: IEthCallFuncParam = {
      data: ERC20FuncSig.balanceOf + address,
      to: token,
    };

    const { body } = await this.rpc.callContract(data, status);
    return body;
  }

  public async name(
    token: string,
    isStandard: boolean = true,
  ): Promise<IJsonRpcResponse<string>> {
    const data: IEthCallFuncParam = {
      data: isStandard ? ERC20FuncSig.name : ERC20FuncSig.NAME,
      to: token,
    };

    const { body } = await this.rpc.callContract(data);
    return body;
  }

  public async symbol(token: string, isStandard: boolean = true) {
    const data: IEthCallFuncParam = {
      data: isStandard ? ERC20FuncSig.symbol : ERC20FuncSig.SYMBOL,
      to: token,
    };

    const { body } = await this.rpc.callContract(data);
    return body;
  }

  public async decimals(token: string, isStandard: boolean = true) {
    const data: IEthCallFuncParam = {
      data: isStandard ? ERC20FuncSig.decimals : ERC20FuncSig.DECIMALS,
      to: token,
    };
    const { body } = await this.rpc.callContract(data);
    return body;
  }

  public async totalSupply(token: string) {
    const data: IEthCallFuncParam = {
      data: ERC20FuncSig.totalSupply,
      to: token,
    };

    const { body } = await this.rpc.callContract(data);
    return body;
  }
}
