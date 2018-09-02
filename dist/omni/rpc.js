"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rpc_1 = require("../bitcoin/rpc");
const mtd_1 = require("./mtd");
class OmniLayerClient extends rpc_1.BitcoinClient {
    constructor(conf) {
        super(conf);
    }
    getOmniInfo() {
        return this.RpcCall(mtd_1.OmniLayerMethods.info.client);
    }
    /**
     * Broadcasts a raw Omni Layer transaction.
     * Use `this.sendRawTx` for anyone instead of sendOmniRawTx
     * @param fromAddress the address to send from
     * @param rawTransaction	the hex-encoded raw transaction
     * @param referenceAddress a reference address (none by default)
     * @param redeemAddress an address that can spend the transaction dust (sender by default)
     * @param referenceAmount a bitcoin amount that is sent to the receiver (minimal by default)
     */
    sendOmniRawTx(fromAddress, rawTransaction, referenceAddress, redeemAddress, referenceAmount) {
        /**
         * if last three params is undefined,the request data will change it to null
         * OmniLayer RPC will resolve it to empty string => ""
         * @see https://github.com/OmniLayer/omnicore/blob/master/src/omnicore/rpctx.cpp#L57
         * @see https://github.com/OmniLayer/omnicore/blob/master/src/omnicore/rpcvalues.cpp#L35
         */
        const params = [
            fromAddress,
            rawTransaction,
            referenceAddress,
            redeemAddress,
            referenceAmount
        ];
        return this.RpcCall(mtd_1.OmniLayerMethods.tx.sendRaw, params);
    }
    /**
     * Returns the token balance for a given address and property.
     * @param address the address
     * @param propertyId the property identifier
     */
    getPropertyBalance(address, propertyId) {
        return this.RpcCall(mtd_1.OmniLayerMethods.address.balance, [address, propertyId]);
    }
    getAllPropertyBalance(address) {
        return this.RpcCall(mtd_1.OmniLayerMethods.address.allBalance, [address]);
    }
    /**
     * Get detailed information about an Omni transaction.
     * @param txid the hash of the transaction to lookup
     */
    getOmniTxInfo(txid) {
        return this.RpcCall(mtd_1.OmniLayerMethods.tx.detail, [txid]);
    }
    /**
     * Lists all Omni transactions in a block.
     * @param height the block height or block index
     */
    getOmniTxList(height) {
        return this.RpcCall(mtd_1.OmniLayerMethods.tx.list, [height]);
    }
    getOmniPendingTxList(address) {
        return this.RpcCall(mtd_1.OmniLayerMethods.tx.pending, [address]);
    }
    /**
     * Returns details for about the tokens or smart property to lookup.
     * @param id property id default is USDT
     */
    getOmniProperty(id = 31) {
        return this.RpcCall(mtd_1.OmniLayerMethods.property.info, [id]);
    }
    /**
     * List WALLET transactions, optionally filtered by an address and block boundaries.
     * !! only your wallet tx list !!
     * @param txid	string	optional	address filter (default: "*")
     * @param count	number	optional	show at most n transactions (default: 10)
     * @param skip	number	optional	skip the first n transactions (default: 0)
     * @param startBlock	number	optional	first block to begin the search (default: 0)
     * @param endBlock	number	optional	last block to include in the search (default: 999999)
     */
    listTx(txid = "*", count = 10, skip = 0, startBlock = 0, endBlock = 999999) {
        const params = [txid, count, skip, startBlock, endBlock];
        return this.RpcCall(mtd_1.OmniLayerMethods.tx.wallet, params);
    }
}
exports.OmniLayerClient = OmniLayerClient;
