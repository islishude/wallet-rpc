"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const methods_1 = require("./methods");
class EthereumClient extends client_1.default {
    constructor(user, pass, ip, port = 30303) {
        super(user, pass, ip, port);
    }
    getBlockCount() {
        return this.RpcCall(methods_1.EthMtd.getBlockNumber);
    }
    getBlockByHash(hash, isFullTransaction = true) {
        const param = [hash, isFullTransaction];
        return this.RpcCall(methods_1.EthMtd.getBlockByHash, param);
    }
    getUncleByBlockHashAndIndex(hash, index) {
        const param = [hash, index];
        return this.RpcCall(methods_1.EthMtd.getUncleByBlockHashAndIndex, param);
    }
    getUncleByBlockNumberAndIndex(height, index) {
        const param = [height, index];
        return this.RpcCall(methods_1.EthMtd.getUncleByBlockNumberAndIndex, param);
    }
    sendRawTx(raw) {
        return this.RpcCall(methods_1.EthMtd.sendRawTransaction, [raw]);
    }
    sendTransaction(tx) {
        return this.RpcCall(methods_1.EthMtd.sendTransaction, [tx]);
    }
    getTransactionCount(address, status = "latest") {
        const param = [address, status];
        return this.RpcCall(methods_1.EthMtd.getTransactionCount, param);
    }
}
exports.default = EthereumClient;
