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
        const method = methods_1.BtcMtd.getRawTransaction;
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
    getRawMemPool(verbose = false) {
        const method = methods_1.BtcMtd.getRawMemPool;
        const params = [verbose];
        return this.RpcCall(method, params);
    }
    getEstimateFee(target = 6, mode = "CONSERVATIVE") {
        const method = methods_1.BtcMtd16.getEstimateFee;
        const params = [target, mode];
        return this.RpcCall(method, params);
    }
    decodeRawTx(tx, isWitness = false) {
        const method = methods_1.BtcMtd.decodeRawTx;
        return this.RpcCall(method, [tx, isWitness]);
    }
    getMemoryInfo() {
        const method = methods_1.BtcMtd16.getMemoryInfo;
        return this.RpcCall(method);
    }
}
exports.default = BitcoinClient;
