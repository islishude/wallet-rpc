"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* spell-checker: disable */
exports.BitcoinMethods = {
    block: {
        count: "getblockcount",
        detail: "getblock",
        hash: "getblockhash"
    },
    fee: "estimatesmartfee",
    info: {
        chain: "getblockchaininfo",
        difficulty: "getdifficulty",
        info: "getinfo",
        memory: "getmemoryinfo",
        wallet: "getwalletinfo"
    },
    mempool: {
        detail: "getrawmempool"
    },
    tx: {
        decode: "decoderawtransaction",
        detail: "gettransaction",
        raw: "getrawtransaction",
        sendRaw: "sendrawtransaction"
    }
};
