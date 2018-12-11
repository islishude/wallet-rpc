import RPCClient, { IRpcConfig, IRpcResponse } from "../client";
import { DKKTokenMethods as mtd } from "./mtd";

export interface IDkktWalletInfo {
  /** spell-checker: disable */
  version: string;
  protocolversion: number;
  walletversion: number;
  balance: number;
  newmint: number;
  stake: number;
  blocks: number;
  timeoffset: number;
  moneysupply: number;
  connections: number;
  proxy: string;
  ip: string;
  difficulty: {
    "proof-of-work": number;
    "proof-of-stake": number;
  };
  testnet: boolean;
  keypoololdest: number;
  keypoolsize: number;
  paytxfee: number;
  mininput: number;
  errors: string;
}

export interface IDkktTxInfo {
  additionalproof?: string;
  additionalamount?: number;
  txid: string;
  version: number;
  time: number;
  locktime: number;
  blockhash: string;
  confirmations: number;
  vin: IDkktTxVin[];
  vout: IDkktTxVout[];
  hex: string;
}

export interface IDkktTxVin {
  txid?: string;
  vout?: number;
  scriptSig?: {
    asm: string;
    hex: string;
  };
  sequence: number;
  coinbase?: string;
}

export interface IDkktTxVout {
  value: number;
  n: number;
  scriptPubKey: {
    asm: string;
    hex: string;
    reqSigs?: number;
    type: string;
    addresses?: string[];
  };
}

export interface IDkktBlockInfo {
  hash: string;
  confirmations: number;
  size: number;
  height: number;
  version: number;
  merkleroot: string;
  mint: number;
  time: number;
  nonce: number;
  bits: string;
  difficulty: number;
  blocktrust: string;
  chaintrust: string;
  previousblockhash: string;
  nextblockhash?: string;
  flags: string;
  proofhash: string;
  entropybit: number;
  modifier: string;
  modifierv2: string;
  tx: string[];
  signature: string;
}
/** spell-checker: enable */

export class DKKTClient extends RPCClient {
  constructor(conf: IRpcConfig = {}) {
    const ip = conf.ip || "http://127.0.0.1";
    const user = conf.user || "";
    const pass = conf.pass || "";
    const port = conf.port || "28880";
    super(user, pass, ip, port, "dkktoken");
  }

  public getInfo() {
    return this.RpcCall<IDkktWalletInfo>(mtd.info);
  }

  public getBlockCount(): Promise<IRpcResponse<number>> {
    return this.RpcCall<number>(mtd.block.count);
  }

  public getBlockHash(height: number) {
    return this.RpcCall<string>(mtd.block.hash, [height]);
  }

  public getBlockInfo(id: string) {
    return this.RpcCall<IDkktBlockInfo>(mtd.block.detail, [id]);
  }

  public getTxInfo(id: string) {
    const param: [string, number] = [id, 1];
    return this.RpcCall<IDkktTxInfo>(mtd.tx.detail, param);
  }

  public sendRawTx(raw: string) {
    return this.RpcCall<string>(mtd.tx.sendRaw, [raw]);
  }

  public getMemPool() {
    return this.RpcCall<string[]>(mtd.mempool);
  }
}
