import { RPCResponse } from "./rpc";

declare namespace Ethereum {
  export interface IEthSyncing {
    startingBlock: string;
    currentBlock: string;
    highestBlock: string;
  }
  export type Status = "earliest" | "latest" | "pending";

  export interface IBlock {
    number?: string;
    hash?: string;
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

  export interface IBlockSimple extends IBlock {
    transactions: string[];
  }

  export interface IBlockVerbose extends IBlock {
    transactions: ITransaction[];
  }

  export interface ITransaction {
    hash: string;
    nonce: string;
    // null when its pending
    blockHash?: string;
    blockNumber?: string;
    transactionIndex?: string;
    from: string;
    // null when its a contract creation transaction.
    to?: string;
    value: string;
    gas: string;
    gasPrice: string;
    input: string;
    v: string;
    r: string;
    s: string;
  }

  export interface ITxReceipt {
    transactionHash: string;
    transactionIndex: string;
    blockHash: string;
    blockNumber: string;
    from: string;
    to: string;
    cumulativeGasUsed: string;
    gasUsed: string;
    contractAddress?: string;
    logs: Array<IReceiptLogs>;
    logsBloom: string;
    status?: "0x1" | "0x0";
    root?: string;
  }

  export interface IReceiptLogs {
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

  export interface ISentTxStruct {
    from: string;
    to: string;
    gas?: string;
    gasPrice?: string;
    value?: string;
    data: string;
    nonce?: string;
  }

  // eth_call param
  export interface ICallFuncParam {
    from?: string;
    to?: string;
    gas?: string;
    gasPrice?: string;
    value?: string;
    data?: string;
  }

  export interface ITraceTxReturn {
    failed: boolean;
    gas: number;
    returnValue: string;
    structLogs: Array<{
      pc: number;
      op: Object;
      gas: number;
      gasPrice: number;
      memory: Object;
      stack: Array<Object>;
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
    callType: "call" | "callcode" | "delegatecall" | "staticcall";
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
    // if error occured then result will be undefined
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

  export interface IAbiStruct {
    name: string;
    // type can be omit,defaulting is "function"
    type: "function" | "constructor" | "fallback";
    // true if function is either pure or view
    constant?: boolean;
    // `indexed` only for event type
    inputs?: Array<IAbiInputStruct>;
    outputs?: Array<IAbiOutputStruct>;
    // for function type
    payable?: boolean;
    // for function type
    stateMutability?: "view" | "pure" | "nonpayable" | "payable";
    // true if event was declare as anonymous
    anonymous?: boolean;
  }

  export interface IAbiCommonStruct {
    name: string;
    type: string;
  }

  export interface IAbiOutputStruct extends IAbiCommonStruct {
    components: IAbiOutputStruct[];
  }

  export interface IAbiInputStruct extends IAbiCommonStruct {
    indexed?: boolean;
  }
}
