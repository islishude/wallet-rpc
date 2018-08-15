"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rpc_1 = require("../bitcoin/rpc");
const mtd_1 = require("./mtd");
class OmniLayerClient extends rpc_1.BitcoinClient {
    constructor(user, pass, ip, port = 8332) {
        super(user, pass, ip, port);
    }
    getOmniInfo() {
        return this.RpcCall(mtd_1.OmniLayerMethods.info.client);
    }
    sendOmniRawTx(fromAddress, rawTransaction, referenceAddress, redeemAddress, referenceAmount) {
        const params = [
            fromAddress,
            rawTransaction,
            referenceAddress,
            redeemAddress,
            referenceAmount
        ];
        return this.RpcCall(mtd_1.OmniLayerMethods.tx.sendRaw, params);
    }
    getPropertyBalance(address, propertyId) {
        return this.RpcCall(mtd_1.OmniLayerMethods.address.balance, [address, propertyId]);
    }
    getAllPropertyBalance(address) {
        return this.RpcCall(mtd_1.OmniLayerMethods.address.allBalance, [address]);
    }
    getOmniTxInfo(txid) {
        return this.RpcCall(mtd_1.OmniLayerMethods.tx.detail, [txid]);
    }
    getOmniTxList(height) {
        return this.RpcCall(mtd_1.OmniLayerMethods.tx.list, [height]);
    }
    getOmniPendingTxList(address) {
        return this.RpcCall(mtd_1.OmniLayerMethods.tx.pending, [address]);
    }
    getOmniProperty(id = 31) {
        return this.RpcCall(mtd_1.OmniLayerMethods.property.info, [id]);
    }
}
exports.OmniLayerClient = OmniLayerClient;
