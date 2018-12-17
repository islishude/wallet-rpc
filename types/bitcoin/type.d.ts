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
export interface IBtcTrxOut {
    bestblock: string;
    confirmations: number;
    value: number;
    scriptPubKey: {
        asm: string;
        hex: string;
        type: string;
        address: string[];
    };
    coinbase: boolean;
}
export interface IBtcMemPoolInfo {
    size: number;
    bytes: number;
    usage: number;
    maxmempool: number;
    mempoolminfee: number;
    minrelaytxfee: number;
}
export {};
