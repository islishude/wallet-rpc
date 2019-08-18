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

export interface IParityRewardAction {
  author: string;
  value: string;
  rewardType: "block" | "uncle";
  // Not production rewardType "emptyStep" | "external"
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

export interface IParityTrxTrace {
  action:
    | IParityCallAction
    | IParityCreateAction
    | IParitySuicideAction
    | IParityRewardAction;
  blockHash: string;
  blockNumber: number;
  // if `suicide` or `reward` result will be null
  // if error found then result will be undefined
  result?: IParityCallResult | IParityCreateResult | null;
  subtraces: number;
  error?: string;
  traceAddress: number[];
  transactionHash: string;
  transactionPosition: number;
  // for block trace has `reward` type
  type: "create" | "call" | "suicide" | "reward";
}

export interface ISyncingStatus {
  startingBlock: string;
  currentBlock: string;
  highestBlock: string;
}

export type BlockParam = "earliest" | "latest" | "pending" | number;

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
  mixHash: string;
  receiptsRoot: string;
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
  transactions: IEthTrx[];
}

export interface IEthTrx {
  hash: string;
  nonce: string;
  blockHash: string | null; // null when its pending
  blockNumber: string | null; // null when its pending
  transactionIndex: string | null; // null when its pending
  from: string;
  to: string | null; // null when its a contract creation transaction.
  value: string;
  gas: string;
  gasPrice: string;
  input: string;
  v: string;
  r: string;
  s: string;
}

export interface IEthTrxReceiptLog {
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

export interface IEthTrxReceipt {
  transactionHash: string;
  transactionIndex: string;
  blockHash: string;
  blockNumber: string;
  from: string;
  to: string | null;
  contractAddress: string | null;
  cumulativeGasUsed: string;
  gasUsed: string;
  logs: IEthTrxReceiptLog[];
  logsBloom: string;
  status?: "0x1" | "0x0";
  root?: string;
}

export interface IEthCallFuncParam {
  from?: string;
  to?: string;
  gas?: string;
  gasPrice?: string;
  value?: string;
  data?: string;
}

export interface IEthTxPoolStatus {
  pending: number;
  queued: number;
}

export interface IEthTxPoolContent {
  pending: {
    [address: string]: {
      [nonce: string]: IEthTrx[];
    };
  };
  queued: {
    [address: string]: {
      [nonce: string]: IEthTrx[];
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

// see https://geth.ethereum.org/rpc/eth_call
export interface IEthCallStateOverride {
  [address: string]: {
    balance?: string;
    nonce?: string;
    code?: string;
    state?: any;
    stateDiff?: any;
  };
}
