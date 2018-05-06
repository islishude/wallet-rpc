import { _RPCResponse } from "./rpc";

declare namespace Bitcoin {
  export interface WalletInfo extends _RPCResponse {
    result: {
      version: string;
      protocolversion: number;
      walletversion: number;
      balance: number;
      blocks: number;
      timeoffset: number;
      connections: number;
      proxy: string;
      difficulty: number;
      testnet: false;
      paytxfee: number;
      realyfee: number;
      errors: null;
    };
  }

  export interface TxInfo extends _RPCResponse {
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
    txid: string;
    vout: number;
    scriptSig: {
      asm: string;
      hex: string;
    };
    sequnence: number;
    coinbase?: string;
    txinwitness: string[];
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

  export interface BlockInfo extends _RPCResponse {
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

  export interface BlockchainInfo extends _RPCResponse {
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
    };
  }
}
