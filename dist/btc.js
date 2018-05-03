"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const methods_1 = require("./methods");
class BitcoinClient extends client_1.default {
    constructor(user, pass, ip, port = 8332) {
        super(user, pass, ip, port);
    }
    getInfo() {
        return this.rpc(methods_1.Mtd.getInfo);
    }
    getBlockCount() {
        return this.rpc(methods_1.Mtd.getBlockCount);
    }
    getBlockHash(height) {
        return this.rpc(methods_1.Mtd.getBlockHash, [height]);
    }
    getBlockInfo(id) {
        return this.rpc(methods_1.Mtd.getBlock, [id]);
    }
    getTxInfo(id) {
        const param = [id, 1];
        return this.rpc(methods_1.Mtd.getTransaction, param);
    }
    sendRawTx(raw) {
        return this.rpc(methods_1.Mtd.sendRawTransaction, [raw]);
    }
}
exports.default = BitcoinClient;
