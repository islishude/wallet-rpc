import { RPCResponse } from "./rpc";

declare namespace DKKToken {
  export interface WalletInfo {
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

  export interface TxInfo {
    additionalproof?: string;
    additionalamount?: number;
    txid: string;
    version: number;
    time: number;
    locktime: number;
    blockhash: string;
    confirmations: number;
    vin: txVins[];
    vout: txVouts[];
    hex: string;
  }

  interface txVins {
    txid?: string;
    vout?: number;
    scriptSig?: {
      asm: string;
      hex: string;
    };
    sequnence: number;
    coinbase?: string;
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

  export interface BlockInfo {
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
  }
}
