"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const methods_1 = require("./methods");
class EthereumClient extends client_1.default {
    constructor(ip, port = 30303, user = "", pass = "") {
        super(user, pass, ip, port);
    }
    getBlockCount() {
        return this.RpcCall(methods_1.EthMtd.getBlockNumber);
    }
    getBlockByHash(hash, getFullTx = false) {
        const param = [hash, getFullTx];
        const method = methods_1.EthMtd.getBlockByHash;
        return this.RpcCall(method, param);
    }
    getBlockByNumber(symbol, getFullTx = false) {
        const param = [symbol, getFullTx];
        const method = methods_1.EthMtd.getBlockByNumber;
        return this.RpcCall(method, param);
    }
    getUncleByBlockHashAndIndex(hash, index) {
        const param = [hash, index];
        const method = methods_1.EthMtd.getUncleByBlockHashAndIndex;
        return this.RpcCall(method, param);
    }
    getUncleByBlockNumberAndIndex(height, index) {
        const param = [height, index];
        const method = methods_1.EthMtd.getUncleByBlockNumberAndIndex;
        return this.RpcCall(method, param);
    }
    getTxByHash(hash) {
        return this.RpcCall(methods_1.EthMtd.getTxByHash, [hash]);
    }
    sendRawTx(raw) {
        return this.RpcCall(methods_1.EthMtd.sendRawTx, [raw]);
    }
    sendTx(tx) {
        return this.RpcCall(methods_1.EthMtd.sendTx, [tx]);
    }
    getTxCount(address, status = "latest") {
        const param = [address, status];
        const method = methods_1.EthMtd.getTxCount;
        return this.RpcCall(method, param);
    }
    getCurrentGasPrice() {
        const method = methods_1.EthMtd.getGasPrice;
        return this.RpcCall(method, []);
    }
    callFunc(param, status = "latest") {
        return this.RpcCall(methods_1.EthMtd.call, [param, status]);
    }
    getCode(address, status) {
        return this.RpcCall(methods_1.EthMtd.getCode);
    }
    getEstimateGas(param, status = "latest") {
        return this.RpcCall(methods_1.EthMtd.getEstimateGas, [param, status]);
    }
}
exports.default = EthereumClient;
