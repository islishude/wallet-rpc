"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DKKTokenMethods = {
    block: {
        count: "getblockcount",
        detail: "getblock",
        hash: "getblockhash"
    },
    info: "getinfo",
    mempool: "getrawmempool",
    tx: {
        decode: "decoderawtransaction",
        detail: "gettransaction",
        raw: "getrawtransaction",
        sendRaw: "sendrawtransaction"
    }
};
