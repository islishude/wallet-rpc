import { RPCResponse } from "./rpc";
/* spell-checker: disable */
declare namespace Bitcoin {
  export interface WalletInfo {
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
    errors: null;
  }

  export interface TxInfo {
    txid: string;
    hash: string;
    size: number;
    vsize: number;
    version: number;
    time: number;
    locktime: number;
    blockhash?: string;
    confirmations?: number;
    vin: txVin[];
    vout: txVout[];
    hex?: string;
    blocktime?: number;
  }

  interface txVin {
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

  interface txVout {
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

  export interface BlockInfo {
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

  export interface BlockchainInfo {
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
    softforks: BlockchainInfoSoftFork[];
  }

  export interface BlockchainInfoSoftFork {
    id: string;
    version: number;
    reject: {
      status: boolean;
    };
  }

  export interface NetworkInfo {
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
    networks: networksInfoArray[];
  }

  export interface networksInfoArray {
    name: string;
    limited: boolean;
    reachable: boolean;
    proxy: string;
    proxy_randomize_credentials: boolean;
  }

  export interface verboseMemPool {
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

  export interface fee {
    feerate: number;
    blocks: number;
  }

  export interface memoryInfo {
    [locked: string]: {
      used: number;
      free: number;
      total: number;
      locked: number;
      chunks_used: number;
      chunks_free: number;
    };
  }
}
