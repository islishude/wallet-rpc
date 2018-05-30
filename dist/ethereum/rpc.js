"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../client");
const mtd_1 = require("./mtd");
class EthereumClient extends client_1.default {
    constructor(ip, port = 30303, user = "", pass = "") {
        super(user, pass, ip, port);
    }
    getBlockCount() {
        return this.RpcCall(mtd_1.EthereumMethods.block.count);
    }
    getBlockByHash(hash, getFullTx = false) {
        const param = [hash, getFullTx];
        return this.RpcCall(mtd_1.EthereumMethods.block.byHash, param);
    }
    getBlock(symbol) {
        const param = [symbol, false];
        return this.RpcCall(mtd_1.EthereumMethods.block.byHeight, param);
    }
    getBlockVerbose(symbol) {
        const param = [symbol, true];
        return this.RpcCall(mtd_1.EthereumMethods.block.byHeight, param);
    }
    getTxByHash(hash) {
        return this.RpcCall(mtd_1.EthereumMethods.tx.byHash, [hash]);
    }
    getTxReceipt(hash) {
        return this.RpcCall(mtd_1.EthereumMethods.tx.receipt, [hash]);
    }
    sendRawTx(raw) {
        return this.RpcCall(mtd_1.EthereumMethods.tx.sendRaw, [raw]);
    }
    sendTx(tx) {
        return this.RpcCall(mtd_1.EthereumMethods.tx.send, [tx]);
    }
    getAddrNonce(address, status = "latest") {
        const param = [address, status];
        return this.RpcCall(mtd_1.EthereumMethods.address.nonce, param);
    }
    getCurrentGasPrice() {
        return this.RpcCall(mtd_1.EthereumMethods.gas.price, []);
    }
    callFunc(param, status = "latest") {
        return this.RpcCall(mtd_1.EthereumMethods.tx.call, [param, status]);
    }
    getCode(address, status) {
        return this.RpcCall(mtd_1.EthereumMethods.address.code);
    }
    getEstimateGas(param, status = "latest") {
        return this.RpcCall(mtd_1.EthereumMethods.gas.estimate, [param, status]);
    }
    traceTx(tx, opt) {
        return this.RpcCall(mtd_1.EthereumMethods.debug.traceTx, [tx, opt]);
    }
}
exports.EthereumClient = EthereumClient;
