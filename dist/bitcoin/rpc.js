"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../client");
const mtd_1 = require("./mtd");
/** spell-checker: enable */
class BitcoinClient extends client_1.default {
    constructor(conf) {
        const ip = conf.ip || "http://127.0.0.1";
        const user = conf.user || "";
        const pass = conf.pass || "";
        const port = conf.port || "8332";
        super(user, pass, ip, port);
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
    // get transaction for bitcoin core 0.16
    // use getRawTransaction method and decode
    getTxInfo(id) {
        const param = [id, true];
        return this.RpcCall(mtd_1.BitcoinMethods.tx.raw, param);
    }
    getRawTxInfo(id) {
        const param = [id, false];
        return this.RpcCall(mtd_1.BitcoinMethods.tx.raw, param);
    }
    /**
     * send raw transaction
     * return the txid
     */
    sendRawTx(raw, highFee = false) {
        return this.RpcCall(mtd_1.BitcoinMethods.tx.sendRaw, [raw, highFee]);
    }
    getBlockchainInfo() {
        return this.RpcCall(mtd_1.BitcoinMethods.info.chain);
    }
    /**
     * get all transaction ids in memory pool
     * as a json array of string transaction ids.
     */
    getMemPool() {
        return this.RpcCall(mtd_1.BitcoinMethods.mempool.detail, [false]);
    }
    getVerboseMemPool() {
        return this.RpcCall(mtd_1.BitcoinMethods.mempool.detail, [true]);
    }
    /**
     * Estimates the approximate fee per kilobyte needed for a transaction to begin
     * confirmation within conf_target blocks if possible and return the number of blocks
     * for which the estimate is valid. Uses virtual transaction size as defined
     * in BIP 141 (witness data is discounted).
     * @param target  Confirmation target in blocks (1 - 1008)
     * @param mode default=CONSERVATIVE The fee estimate mode.
     * Whether to return a more conservative estimate which also satisfies
     * a longer history. A conservative estimate potentially returns a
     * higher fee rate and is more likely to be sufficient for the desired
     * target, but is not as responsive to short term drops in the
     * prevailing fee market.
     * @see https://bitcoin-rpc.github.io/estimatesmartfee.html
     */
    getEstimateFee(target = 6, mode = "CONSERVATIVE") {
        const params = [target, mode];
        return this.RpcCall(mtd_1.BitcoinMethods.fee, params);
    }
    decodeRawTx(tx, isWitness = false) {
        return this.RpcCall(mtd_1.BitcoinMethods.tx.decode, [tx, isWitness]);
    }
    // get information about memory usage.
    getMemoryInfo() {
        return this.RpcCall(mtd_1.BitcoinMethods.info.memory);
    }
}
exports.BitcoinClient = BitcoinClient;
