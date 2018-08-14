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
            params.push(referenceAddress);
        }
        if (redeemAddress !== undefined) {
            params.push(redeemAddress);
        }
        if (referenceAmount !== undefined) {
            params.push(referenceAmount);
        }
        return this.RpcCall(mtd_1.OmniLayerMethods.tx.sendRaw, params);
    }
    getBalance(address, propertyId) {
        return this.RpcCall(mtd_1.OmniLayerMethods.address.balance, [address, propertyId]);
    }
    getAllBalance(address) {
        return this.RpcCall(mtd_1.OmniLayerMethods.address.allBalance, [address]);
    }
    getTxInfo(txid) {
        return this.RpcCall(mtd_1.OmniLayerMethods.tx.detail, [txid]);
    }
    getTxList(height) {
        return this.RpcCall(mtd_1.OmniLayerMethods.tx.list, [height]);
    }
    getPendingTxList(address) {
        return this.RpcCall(mtd_1.OmniLayerMethods.tx.pending, [address]);
    }
    getProperty(id = 31) {
        return this.RpcCall(mtd_1.OmniLayerMethods.property.info, [id]);
    }
}
exports.OmniLayerClient = OmniLayerClient;
