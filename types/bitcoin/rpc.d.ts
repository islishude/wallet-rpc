import RPCClient, { IRpcConfig, IRpcResponse } from "../client";
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
    errors: null;
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
export declare class BitcoinClient extends RPCClient {
    constructor(conf: IRpcConfig);
    getInfo(): Promise<IRpcResponse<IBtcWalletInfo>>;
    getBlockCount(): Promise<IRpcResponse<number>>;
    getBlockHash(height: number): Promise<IRpcResponse<string>>;
    getBlockInfo(id: string): Promise<IRpcResponse<IBtcBlockInfo>>;
    getTxInfo(id: string): Promise<IRpcResponse<IBtcTxInfo>>;
    getRawTxInfo(id: string): Promise<IRpcResponse<string>>;
    /**
     * send raw transaction
     * return the txid
     */
    sendRawTx(raw: string, highFee?: boolean): Promise<IRpcResponse<string>>;
    getBlockchainInfo(): Promise<IRpcResponse<IBtcBlockchainInfo>>;
    /**
     * get all transaction ids in memory pool
     * as a json array of string transaction ids.
     */
    getMemPool(): Promise<IRpcResponse<string[]>>;
    getVerboseMemPool(): Promise<IRpcResponse<IBtcVerboseMemPool[]>>;
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
    getEstimateFee(target?: number, mode?: "ECONOMICAL" | "CONSERVATIVE"): Promise<IRpcResponse<IBtcFee>>;
    decodeRawTx(tx: string, isWitness?: boolean): Promise<IRpcResponse<IBtcTxInfo>>;
    getMemoryInfo(): Promise<IRpcResponse<IBtcMemoryInfo>>;
}
export {};
