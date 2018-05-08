"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const methods_1 = require("./methods");
class BitcoinClient extends client_1.default {
    constructor(user, pass, ip, port = 8332) {
        super(user, pass, ip, port);
    }
    getInfo() {
        return this.RpcCall(methods_1.BtcMtd.getInfo);
    }
    getBlockCount() {
        return this.RpcCall(methods_1.BtcMtd.getBlockCount);
    }
    getBlockHash(height) {
        return this.RpcCall(methods_1.BtcMtd.getBlockHash, [height]);
    }
    getBlockInfo(id) {
        return this.RpcCall(methods_1.BtcMtd.getBlock, [id]);
    }
    getTxInfo(id, decode = true) {
        const param = [id, decode];
        const method = methods_1.BtcMtd.getTransaction;
        return this.RpcCall(method, param);
    }
    sendRawTx(raw, highFee = false) {
        const method = methods_1.BtcMtd.sendRawTransaction;
        return this.RpcCall(method, [raw, highFee]);
    }
    getBlockchainInfo() {
        const method = methods_1.BtcMtd16.getBlockInfo;
        return this.RpcCall(method);
    }
}
exports.default = BitcoinClient;
