"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../client");
const mtd_1 = require("./mtd");
const { block, tx } = mtd_1.DKKTokenMethods;
class DKKTClient extends client_1.default {
    constructor(user, pass, ip, port = 28880) {
        super(user, pass, ip, port);
    }
    getInfo() {
        return this.RpcCall(mtd_1.DKKTokenMethods.info);
    }
    getBlockCount() {
        return this.RpcCall(block.count);
    }
    getBlockHash(height) {
        return this.RpcCall(block.hash, [height]);
    }
    getBlockInfo(id) {
        return this.RpcCall(block.detail, [id]);
    }
    getTxInfo(id) {
        const param = [id];
        return this.RpcCall(tx.detail, param);
    }
    sendRawTx(raw) {
        return this.RpcCall(tx.sendRaw, [raw]);
    }
    getRawMemPool() {
        return this.RpcCall(mtd_1.DKKTokenMethods.mempool);
    }
}
exports.DKKTClient = DKKTClient;
