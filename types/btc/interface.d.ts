import { RPC } from "../client";
export interface getInfoRes extends RPC {
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
export interface getTxInfoRes extends RPC {
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
export interface txVins {
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
export interface txVouts {
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
export interface getBlockInfo extends RPC {
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
