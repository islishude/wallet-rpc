"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const helper_1 = require("../helper");
const mtd_1 = require("./mtd");
class EOSClient {
    /**
     * EOS RPC isn't JSONRPC,so here is diff with bitcoin.
     * @param url schema+ip+url e.g. http://127.0.0.1:8888
     * @param ver API Version Now only supports `v1`
     */
    constructor(url = "http://127.0.0.1:8888", ver = "v1") {
        this.URL = `${url}/${ver}/`;
    }
    /**
     * RPC Call helper func
     * @param method request method from "./mtd.ts"
     * @throws Request or Response error throw
     */
    async CALL(method, body) {
        const url = this.URL + method;
        try {
            const result = await axios_1.default.post(url, body, { timeout: 60000 });
            return result.data;
        }
        catch (e) {
            throw new Error(helper_1.HandleError(e, this.URL));
        }
    }
    /**
     * Returns an object containing various details about the blockchain.
     */
    getInfo() {
        return this.CALL(mtd_1.EOSMethods.chain.info);
    }
    /**
     * Returns an object containing various details about a specific block on the blockchain.
     * @param id Provide a block number or a block id
     */
    getBlock(id) {
        return this.CALL(mtd_1.EOSMethods.chain.block, { block_num_or_id: id });
    }
    /**
     * Returns an object containing various details about a specific account on the blockchain.
     */
    getAccount(account) {
        return this.CALL(mtd_1.EOSMethods.chain.block, { account_name: account });
    }
    /**
     * get ABI of providing account name
     * @param account
     */
    getABI(account) {
        return this.CALL(mtd_1.EOSMethods.chain.abi, { account_name: account });
    }
    getCode(account) {
        return this.CALL(mtd_1.EOSMethods.chain.code, { account_name: account });
    }
    getRawCodeAndABI(account) {
        return this.CALL(mtd_1.EOSMethods.chain.rawCodeAndABI, { account_name: account });
    }
    /**
     * Get block header state
     * @param id Provide a block number or a block id
     */
    getBlockHeaderState(id) {
        return this.CALL(mtd_1.EOSMethods.chain.blockHeaderState, { block_num_or_id: id });
    }
    getBalance(code, account, symbol) {
        return this.CALL(mtd_1.EOSMethods.chain.balance, { code, symbol, account });
    }
    /**
     * This method expects a transaction in JSON format and will attempt to apply it to the blockchain.
     * @param signs signatures array of signatures required to authorize transaction
     * @param compression compression used, usually false
     * @param data packed_context_free_data: json of hex
     * @param tx packed_trx: json of hex
     */
    sendTx(signs, compression, data, tx) {
        return this.CALL(mtd_1.EOSMethods.chain.sendTx, {
            signatures: signs,
            compression,
            packed_context_free_data: data,
            packed_tx: tx
        });
    }
    sendTxes(body) {
        return this.CALL(mtd_1.EOSMethods.chain.sendTxes, { body });
    }
    getTxInfo(id) {
        return this.CALL(mtd_1.EOSMethods.history.tx, { id });
    }
    getKeyAccount(pubKey) {
        return this.CALL(mtd_1.EOSMethods.history.tx, { public_key: pubKey });
    }
    getControlledAccounts(account) {
        return this.CALL(mtd_1.EOSMethods.history.ctrlAccounts, {
            controlling_account: account
        });
    }
}
exports.EOSClient = EOSClient;
