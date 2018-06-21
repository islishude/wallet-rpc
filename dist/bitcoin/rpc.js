"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../client");
const mtd_1 = require("./mtd");
class BitcoinClient extends client_1.default {
    constructor(user, pass, ip, port = 8332, isHttps = false) {
        super(user, pass, ip, port, isHttps);
    }
    getInfo() {
        return this.RpcCall(mtd_1.BitcoinMethods.info.info);
    }
    getBlockCount() {
        return this.RpcCall(mtd_1.BitcoinMethods.block.count);
    }
    getBlockHash(height) {
        return this.RpcCall(mtd_1.BitcoinMethods.block.hash, [height]);
    }
    getBlockInfo(id) {
        return this.RpcCall(mtd_1.BitcoinMethods.block.detail, [id]);
    }
    getTxInfo(id) {
        const param = [id, true];
        return this.RpcCall(mtd_1.BitcoinMethods.tx.detail, param);
    }
    getRawTxInfo(id) {
        const param = [id, false];
        return this.RpcCall(mtd_1.BitcoinMethods.tx.raw, param);
    }
    sendRawTx(raw, highFee = false) {
        return this.RpcCall(mtd_1.BitcoinMethods.tx.sendRaw, [raw, highFee]);
    }
    getBlockchainInfo() {
        return this.RpcCall(mtd_1.BitcoinMethods.info.chain);
    }
    getMemPool() {
        return this.RpcCall(mtd_1.BitcoinMethods.mempool.detail, [false]);
    }
    getVerboseMemPool() {
        return this.RpcCall(mtd_1.BitcoinMethods.mempool.detail, [true]);
    }
    getEstimateFee(target = 6, mode = "CONSERVATIVE") {
        const params = [target, mode];
        return this.RpcCall(mtd_1.BitcoinMethods.fee, params);
    }
    decodeRawTx(tx, isWitness = false) {
        return this.RpcCall(mtd_1.BitcoinMethods.tx.decode, [tx, isWitness]);
    }
    getMemoryInfo() {
        return this.RpcCall(mtd_1.BitcoinMethods.info.memory);
    }
}
exports.BitcoinClient = BitcoinClient;
