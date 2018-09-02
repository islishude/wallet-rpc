import RPCClient, { IRpcConfig, IRpcResponse } from "../client";
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
    vin: IDkktTxVinStruct[];
    vout: IDkktTxVoutStruct[];
    hex: string;
}
export interface IDkktTxVinStruct {
    txid?: string;
    vout?: number;
    scriptSig?: {
        asm: string;
        hex: string;
    };
    sequence: number;
    coinbase?: string;
}
export interface IDkktTxVoutStruct {
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
export declare class DKKTClient extends RPCClient {
    constructor(conf: IRpcConfig);
    getInfo(): Promise<IRpcResponse<IDkktWalletInfo>>;
    getBlockCount(): Promise<IRpcResponse<number>>;
    getBlockHash(height: number): Promise<IRpcResponse<string>>;
    getBlockInfo(id: string): Promise<IRpcResponse<IDkktBlockInfo>>;
    getTxInfo(id: string): Promise<IRpcResponse<IDkktTxInfo>>;
    sendRawTx(raw: string): Promise<IRpcResponse<string>>;
    getMemPool(): Promise<IRpcResponse<string[]>>;
}
