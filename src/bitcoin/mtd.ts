/* spell-checker: disable */
export const BitcoinMethods = {
  block: {
    count: "getblockcount",
    detail: "getblock",
    hash: "getblockhash",
    tipHash: "getbestblockhash",
  },
  fee: "estimatesmartfee",
  info: {
    chain: "getblockchaininfo",
    difficulty: "getdifficulty",
    info: "getinfo",
    memory: "getmemoryinfo",
    wallet: "getwalletinfo",
  },
  mempool: {
    detail: "getrawmempool",
    info: "getmempoolinfo",
  },
  tx: {
    decode: "decoderawtransaction",
    detail: "gettransaction",
    raw: "getrawtransaction",
    sendRaw: "sendrawtransaction",
    utxo: "gettxout",
  },
};
