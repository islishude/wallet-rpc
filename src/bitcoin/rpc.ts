import RPCClient, { IRpcConfig, IRpcResponse } from "../client";
import { BitcoinMethods as mtd } from "./mtd";

/** spell-checker: disable */
export interface IBtcWalletInfo {
  version: number;
  protocolversion: number;
  walletversion: number;
  balance: number;
  blocks: number;
  timeoffset: number;
  connections: number;
  proxy: string;
  difficulty: number;
  testnet: boolean;
  paytxfee: number;
  realyfee: number;
  errors: string | null;
}

export interface IBtcTxInfo {
  txid: string;
  hash: string;
  size: number;
  vsize: number;
  version: number;
  time: number;
  locktime: number;
  blockhash?: string;
  confirmations?: number;
  vin: IBtcTxVin[];
  vout: IBtcTxVout[];
  hex?: string;
  blocktime?: number;
}

export interface IBtcTxVin {
  txid?: string;
  vout?: number;
  scriptSig: {
    asm: string;
    hex: string;
  };
  sequence: number;
  coinbase?: string;
  txinwitness?: string[];
}

export interface IBtcTxVout {
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

export interface IBtcBlockInfo {
  hash: string;
  confirmations: number;
  size: number;
  height: number;
  version: number;
  versionHex: number;
  merkleroot: string;
  time: number;
  mediantime: number;
  nonce: number;
  bits: string;
  difficulty: number;
  previousblockhash: string;
  nextblockhash?: string;
  tx: string[];
  strippedsize: number;
  chainwork: string;
  weight: number;
}

export interface IBtcBlockchainInfo {
  chain: string;
  blocks: number;
  headers: number;
  blockhash: string;
  difficulty: number;
  mediantime: number;
  verificationprogress: number;
  initialblockdownload: boolean;
  chainwork: string;
  warnings: string;
  pruned: boolean;
  size_on_disk: number;
  softforks: IBlockchainInfoSoftfork[];
}

interface IBlockchainInfoSoftfork {
  id: string;
  version: number;
  reject: {
    status: boolean;
  };
}

export interface IBtcNetworkInfo {
  version: number;
  subversion: string;
  protocolversion: number;
  localservices: string;
  localrelay: boolean;
  timeoffset: number;
  networkactive: boolean;
  connections: number;
  relayfee: number;
  incrementalfee: number;
  warnings: string;
  localaddresses: string[];
  networks: INetworksInfo[];
}

interface INetworksInfo {
  name: string;
  limited: boolean;
  reachable: boolean;
  proxy: string;
  proxy_randomize_credentials: boolean;
}

export interface IBtcVerboseMemPool {
  [txid: string]: {
    size: number;
    fee: number;
    modifiedfee: number;
    time: number;
    height: number;
    descendantcount: number;
    descendantsize: number;
    descendantfees: number;
    ancestorcount: number;
    ancestorsize: number;
    ancestorfees: number;
    wtxid: string;
    depends: string[];
  };
}

export interface IBtcFee {
  feerate: number;
  blocks: number;
  errors?: string[];
}

export interface IBtcMemoryInfo {
  [locked: string]: {
    used: number;
    free: number;
    total: number;
    locked: number;
    chunks_used: number;
    chunks_free: number;
  };
}
/** spell-checker: enable */

export class BitcoinClient extends RPCClient {
  constructor(conf: IRpcConfig = {}) {
    const ip = conf.ip || "http://127.0.0.1";
    const user = conf.user || "";
    const pass = conf.pass || "";
    const port = conf.port || "8332";
    super(user, pass, ip, port, "bitcoin");
  }

  public getInfo() {
    return this.RpcCall<IBtcWalletInfo>(mtd.info.info);
  }

  public getBlockCount(): Promise<IRpcResponse<number>> {
    return this.RpcCall<number>(mtd.block.count);
  }

  public getBlockHash(height: number) {
    return this.RpcCall<string>(mtd.block.hash, [height]);
  }

  public getBlockInfo(id: string) {
    return this.RpcCall<IBtcBlockInfo>(mtd.block.detail, [id]);
  }

  // get transaction for bitcoin core 0.16
  // use getRawTransaction method and decode
  public getTxInfo(id: string) {
    const param: [string, number] = [id, 1];
    return this.RpcCall<IBtcTxInfo>(mtd.tx.raw, param);
  }

  public getRawTxInfo(id: string) {
    const param: [string, number] = [id, 0];
    return this.RpcCall<string>(mtd.tx.raw, param);
  }

  /**
   * send raw transaction
   * return the txid
   */
  public sendRawTx(raw: string, highFee: boolean = false) {
    return this.RpcCall<string>(mtd.tx.sendRaw, [raw, highFee]);
  }

  public getBlockchainInfo() {
    return this.RpcCall<IBtcBlockchainInfo>(mtd.info.chain);
  }

  /**
   * get all transaction ids in memory pool
   * as a json array of string transaction ids.
   */
  public getMemPool() {
    return this.RpcCall<string[]>(mtd.mempool.detail, [false]);
  }

  public getVerboseMemPool() {
    return this.RpcCall<IBtcVerboseMemPool[]>(mtd.mempool.detail, [true]);
  }

  /**
   * Estimates the approximate fee per kilobyte needed for a transaction to begin
   * confirmation within conf_target blocks if possible and return the number of blocks
   * for which the estimate is valid. Uses virtual transaction size as defined
   * in BIP 141 (witness data is discounted).
   * @param target  Confirmation target in blocks (1 - 1008)
   * @param mode default=CONSERVATIVE The fee estimate mode.
   * Whether to return a more conservative estimate which also satisfies
   * a longer history. A conservative estimate potentially returns a
   * higher fee rate and is more likely to be sufficient for the desired
   * target, but is not as responsive to short term drops in the
   * prevailing fee market.
   * @see https://bitcoin-rpc.github.io/estimatesmartfee.html
   */
  public getEstimateFee(
    target: number = 6,
    mode: "ECONOMICAL" | "CONSERVATIVE" = "CONSERVATIVE"
  ) {
    const params: [number, string] = [target, mode];
    return this.RpcCall<IBtcFee>(mtd.fee, params);
  }

  public decodeRawTx(tx: string, isWitness: boolean = false) {
    return this.RpcCall<IBtcTxInfo>(mtd.tx.decode, [tx, isWitness]);
  }

  // get information about memory usage.
  public getMemoryInfo() {
    return this.RpcCall<IBtcMemoryInfo>(mtd.info.memory);
  }
}
