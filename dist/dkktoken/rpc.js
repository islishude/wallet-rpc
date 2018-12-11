"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../client");
const mtd_1 = require("./mtd");
/** spell-checker: enable */
class DKKTClient extends client_1.default {
    constructor(conf = {}) {
        const ip = conf.ip || "http://127.0.0.1";
        const user = conf.user || "";
        const pass = conf.pass || "";
        const port = conf.port || "28880";
        super(user, pass, ip, port, "dkktoken");
    }
    getInfo() {
        return this.RpcCall(mtd_1.DKKTokenMethods.info);
    }
    getBlockCount() {
        return this.RpcCall(mtd_1.DKKTokenMethods.block.count);
    }
    getBlockHash(height) {
        return this.RpcCall(mtd_1.DKKTokenMethods.block.hash, [height]);
    }
    getBlockInfo(id) {
        return this.RpcCall(mtd_1.DKKTokenMethods.block.detail, [id]);
    }
    getTxInfo(id) {
        const param = [id, 1];
        return this.RpcCall(mtd_1.DKKTokenMethods.tx.detail, param);
    }
    sendRawTx(raw) {
        return this.RpcCall(mtd_1.DKKTokenMethods.tx.sendRaw, [raw]);
    }
    getMemPool() {
        return this.RpcCall(mtd_1.DKKTokenMethods.mempool);
    }
}
exports.DKKTClient = DKKTClient;
