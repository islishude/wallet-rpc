import { RPCResponse } from "./rpc";

declare namespace Ethereum {
  export type Status = "earliest" | "latest" | "pending";

  export interface IBlock {
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
    transactions: string[] | ITransaction[];
    uncles: string[];
  }

  export interface ITransaction {
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

  export interface ITxReceipt {
    transactionHash: string;
    transactionIndex: string;
    blockHash: string;
    blockNumber: string;
    cumulativeGasUsed: string;
    contractAddress?: string;
    logs: Array<IReceiptLogs>;
    logsBloom: string;
    status?: string;
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
}
