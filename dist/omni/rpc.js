"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../client");
const mtd_1 = require("./mtd");
class OmniLayerClient extends client_1.default {
    constructor(user, pass, ip, port = 8332) {
        super(user, pass, ip, port);
    }
    getInfo() {
        return this.RpcCall(mtd_1.OmniLayerMethods.info.client);
    }
    getBlockCount() {
        return this.RpcCall(mtd_1.OmniLayerMethods.block.count);
    }
    sendRawTx(fromAddress, rawTransaction, referenceAddress, redeemAddress, referenceAmount) {
        const params = [fromAddress, rawTransaction];
        if (referenceAddress !== undefined) {
            params.push(referenceAddress, redeemAddress, referenceAmount);
        }
        return this.RpcCall(mtd_1.OmniLayerMethods.tx.sendRaw, params);
    }
    getBalance(address, propertyId) {
        return this.RpcCall(mtd_1.OmniLayerMethods.address.balance, [address, propertyId]);
    }
    getTxInfo(txid) {
        return this.RpcCall(mtd_1.OmniLayerMethods.tx.detail, [txid]);
    }
    getTxList(height) {
        return this.RpcCall(mtd_1.OmniLayerMethods.block.txList, [height]);
    }
    getPendingTxList(address) {
        return this.RpcCall(mtd_1.OmniLayerMethods.block.pendingTxList, [address]);
    }
    getProperty(id = 31) {
        return this.RpcCall(mtd_1.OmniLayerMethods.property.info, [id]);
    }
}
exports.OmniLayerClient = OmniLayerClient;
