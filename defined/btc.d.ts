import { RPCResponse } from "./rpc";

declare namespace Bitcoin {
  export interface WalletInfo extends RPCResponse {
    result: {
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
    };
  }

  export interface TxInfo extends RPCResponse {
    result: {
      txid: string;
      hash: string;
      size: number;
      vsize: number;
      version: number;
      time: number;
      locktime: number;
      blockhash: string;
      confirmations: number;
      vin: txVins[];
      vout: txVouts[];
      hex: string;
      blocktime: number;
    };
  }

  interface txVins {
    txid?: string;
    vout?: number;
    scriptSig: {
      asm: string;
      hex: string;
    };
    sequnence: number;
    coinbase?: string;
    txinwitness?: string[];
  }

  interface txVouts {
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

  export interface BlockInfo extends RPCResponse {
    result: {
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
      blocktruct: string;
      chaintrust: string;
      previousblockhash: string;
      nextblockhash: string;
      flags: string;
      proofhash: string;
      entropybit: number;
      modiffier: string;
      modifierv2: string;
      tx: string[];
      signature: string;
    };
  }

  export interface BlockchainInfo extends RPCResponse {
    result: {
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
    };
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

  export interface verboseMemPool extends RPCResponse {
    result:{
      [txid: string]: {
        size: number,
        fee: number,
        modifiedfee: number,
        time: number,
        height: number,
        descendantcount: number,
        descendantsize: number,
        descendantfees: number,
        ancestorcount: number,
        ancestorsize: number,
        ancestorfees: number,
        wtxid: string,
        depends: string[]
      }
    }
  }
}
