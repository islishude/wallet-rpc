"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BtcMtd = {
    decodeRawTx: "decoderawtransaction",
    getBlock: "getblock",
    getBlockCount: "getblockcount",
    getBlockHash: "getblockhash",
    getDifficulty: "getdifficulty",
    getInfo: "getinfo",
    getRawMemPool: "getrawmempool",
    getRawTransaction: "getrawtransaction",
    getTransaction: "gettransaction",
    sendRawTransaction: "sendrawtransaction",
    validateAddress: "validateaddress",
};
exports.EthMtd = {
    call: "eth_call",
    getBalance: "eth_getBalance",
    getBlockByHash: "eth_getBlockByHash",
    getBlockNumber: "eth_blockNumber",
    getBlockTxCountByHash: "eth_getBlockTransactionCountByHash",
    getBlockTxCountByNumber: "eth_getBlockTransactionCountByNumber",
    getGasPrice: "eth_gasPrice",
    getTxByBlockHashAndIndex: "eth_getTransactionByBlockHashAndIndex",
    getTxCount: "eth_getTransactionCount",
    getTxReceipt: "eth_getTransactionReceipt",
    getUncleByBlockHashAndIndex: "eth_getUncleByBlockHashAndIndex",
    getUncleByBlockNumberAndIndex: "eth_getUncleByBlockHashAndIndex",
    sendRawTx: "eth_sendRawTransaction",
    sendTx: "eth_sendTransaction"
};
exports.BtcMtd16 = {
    getBlockInfo: "getblockinfo",
    getEstimateFee: "estimatesmartfee",
    getMemoryInfo: "getmemoryinfo",
    getWalletInfo: "getwalletinfo",
};
