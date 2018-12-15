

export interface IEthSyncing {
    startingBlock: string;
    currentBlock: string;
    highestBlock: string;
}
export type IEthStatus = "earliest" | "latest" | "pending";

export interface IEthBlock {
    number: string | null;
    hash: string | null;
    parentHash: string;
    nonce: string;
    sha3Uncles: string;
    logsBloom: string;
    transactionsRoot: string;
    stateRoot: string;
    miner: string;
    difficulty: string;
    totalDifficulty: string;
    extraData: string;
    size: string;
    gasLimit: string;
    gasUsed: string;
    timestamp: string;
    uncles: string[];
}

export interface IEthBlockSimple extends IEthBlock {
    transactions: string[];
}

export interface IEthBlockVerbose extends IEthBlock {
    transactions: IEthTx[];
}

export interface IEthTx {
    hash: string;
    nonce: string;
    // null when its pending
    blockHash: string | null;
    blockNumber: string | null;
    transactionIndex: string | null;
    from: string;
    // null when its a contract creation transaction.
    to: string | null;
    value: string;
    gas: string;
    gasPrice: string;
    input: string;
    v: string;
    r: string;
    s: string;
}

export interface IEthTxReceipt {
    transactionHash: string;
    transactionIndex: string;
    blockHash: string;
    blockNumber: string;
    from: string;
    to: string | null;
    contractAddress: string | null;
    cumulativeGasUsed: string;
    gasUsed: string;
    logs: IEthReceiptLogs[];
    logsBloom: string;
    status?: "0x1" | "0x0";
    root?: string;
}

export interface IEthReceiptLogs {
    address: string;
    topics: string[];
    data: string;
    blockNumber?: string;
    transactionHash?: string;
    transactionIndex?: string;
    blockHash?: string;
    logIndex: string;
    removed: boolean;
}

export interface IEthSentTxStruct {
    from: string;
    to: string;
    gas?: string;
    gasPrice?: string;
    value?: string;
    data: string;
    nonce?: string;
}

// eth_call param
export interface IEthCallFuncParam {
    from?: string;
    to?: string;
    gas?: string;
    gasPrice?: string;
    value?: string;
    data?: string;
}

export interface IEthTraceTxReturn {
    failed: boolean;
    gas: number;
    returnValue: string;
    structLogs: Array<{
        pc: number;
        op: object;
        gas: number;
        gasPrice: number;
        memory: object;
        stack: object[];
        account: string;
        err: string;
    }>;
}

export interface IParityCreateAction {
    from: string;
    value: string;
    gas: string;
    init: string;
}

export interface IParityCallAction {
    /** spell-checker: disable */
    callType: "call" | "callcode" | "delegatecall" | "staticcall";
    /** spell-checker: enable */
    from: string;
    to: string;
    value: string;
    gas: string;
    input: string;
}

export interface IParitySuicideAction {
    address: string;
    refundAddress: string;
    balance: string;
}

export interface IParityCreateResult {
    address: string;
    code: string;
    gasUsed: string;
}

export interface IParityCallResult {
    gasUsed: string;
    output: string;
}

export interface IParityTxTrace {
    action: IParityCallAction | IParityCreateAction | IParitySuicideAction;
    blockHash: string;
    blockNumber: number;
    // if `suicide` result will be null
    // if error found then result will be undefined
    result?: IParityCallResult | IParityCreateResult | null;
    subtraces: number;
    error?: string;
    traceAddress: number[];
    transactionHash: string;
    transactionPosition: number;
    // for block trace has `reward` type
    type: "create" | "call" | "suicide";
}

export interface IEtherScanAbiResponse {
    status: string;
    message: string;
    result: string;
}

export interface IEthAbiStruct {
    name: string;
    // type can be omit,defaulting is "function"
    type: "function" | "constructor" | "fallback";
    // true if function is either pure or view
    constant?: boolean;
    // `indexed` only for event type
    inputs?: IEthAbiInputStruct[];
    outputs?: IEthAbiOutputStruct[];
    // for function type
    payable?: boolean;
    // for function type
    stateMutability?: "view" | "pure" | "nonpayable" | "payable";
    // true if event was declare as anonymous
    anonymous?: boolean;
}

export interface IEthAbiCommonStruct {
    name: string;
    type: string;
}

export interface IEthAbiOutputStruct extends IEthAbiCommonStruct {
    components: IEthAbiOutputStruct[];
}

export interface IEthAbiInputStruct extends IEthAbiCommonStruct {
    indexed?: boolean;
}

export interface IEthTxPoolContent {
    pending: {
        [address: string]: {
            [nonce: string]: IEthTx[];
        };
    };
    queued: {
        [address: string]: {
            [nonce: string]: IEthTx[];
        };
    };
}

export interface IEthTxPoolInspect {
    pending: {
        [address: string]: {
            [nonce: string]: string[];
        };
    };
    queued: {
        [address: string]: {
            [nonce: string]: string[];
        };
    };
}

export interface IEthTxPoolStatus {
    pending: number;
    queued: number;
}
