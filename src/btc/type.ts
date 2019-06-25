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
  versionHex: string;
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
  difficulty: number;
  mediantime: number;
  verificationprogress: number;
  initialblockdownload: boolean;
  bestblockhash: string;
  chainwork: string;
  warnings: string;
  pruned: boolean;
  size_on_disk: number;
  softforks: Array<{
    id: string;
    version: number;
    reject: {
      status: boolean;
    };
  }>;
  bip9_softforks: any;
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
  networks: Array<{
    name: string;
    limited: boolean;
    reachable: boolean;
    proxy: string;
    proxy_randomize_credentials: boolean;
  }>;
  localaddresses: Array<{
    address: string;
    port: number;
    score: number;
  }>;
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
  // Current tx count
  size: number;
  // Sum of all virtual transaction sizes as defined in BIP 141.
  // Differs from actual serialized size because witness data is discounted
  bytes: number;
  // Total memory usage for the mempool
  usage: number;
  // Maximum memory usage for the mempool
  maxmempool: number;
  // Minimum fee rate in BTC/kB for tx to be accepted. Is the maximum of minrelaytxfee and minimum mempool fee
  mempoolminfee: number;
  // Current minimum relay fee for transactions
  minrelaytxfee: number;
}
