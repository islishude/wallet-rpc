"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const console_1 = require("console");
const helper_1 = require("../helper");
const mtd_1 = require("./mtd");
class EOSClient {
    /**
     * EOS RPC isn't JSONRPC,so here is diff with bitcoin.
     * @param url schema+ip+url e.g. http://127.0.0.1:8888
     * @param ver API Version Now only supports `v1`
     */
    constructor(url = "http://127.0.0.1:8888", ver = "v1") {
        console_1.log("\x1b[41m\x1b[37mEOS Client of wallet-prc is still under active development,use of the feature is not recommended in production environments\x1b[0m");
        this.URL = `${url}/${ver}/`;
    }
    getCallURL(module, api) {
        return `${this.URL}/${module}/${api}`;
    }
    /**
     * RPC Call helper func
     * @param method request method from "./mtd.ts"
     * @throws Request or Response error throw
     */
    async CALL(module, method, body) {
        const url = this.getCallURL(module, method);
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
        return this.CALL(mtd_1.EosModule.chain, mtd_1.EOSMethods.chain.info);
    }
    /**
     * Returns an object containing various details about a specific block on the blockchain.
     * @param id Provide a block number or a block id
     */
    getBlock(id) {
        return this.CALL(mtd_1.EosModule.chain, mtd_1.EOSMethods.chain.block, {
            block_num_or_id: id
        });
    }
    /**
     * Returns an object containing various details about a specific account on the blockchain.
     */
    getAccountInfo(account) {
        return this.CALL(mtd_1.EosModule.chain, mtd_1.EOSMethods.chain.block, {
            account_name: account
        });
    }
    getAccountsByPubKey(pubKey) {
        return this.CALL(mtd_1.EosModule.history, mtd_1.EOSMethods.history.tx, {
            public_key: pubKey
        });
    }
    /**
     * get ABI of providing account name
     * @param account
     */
    getABI(account) {
        return this.CALL(mtd_1.EosModule.chain, mtd_1.EOSMethods.chain.abi, { account_name: account });
    }
    getCode(account) {
        return this.CALL(mtd_1.EosModule.chain, mtd_1.EOSMethods.chain.code, { account_name: account });
    }
    getRawCodeAndABI(account) {
        return this.CALL(mtd_1.EosModule.chain, mtd_1.EOSMethods.chain.rawCodeAndABI, {
            account_name: account
        });
    }
    /**
     * Get block header state
     * @param id Provide a block number or a block id
     */
    getBlockHeaderState(id) {
        return this.CALL(mtd_1.EosModule.chain, mtd_1.EOSMethods.chain.blockHeaderState, {
            block_num_or_id: id
        });
    }
    getBalance(code, account, symbol) {
        return this.CALL(mtd_1.EosModule.chain, mtd_1.EOSMethods.chain.balance, {
            account,
            code,
            symbol
        });
    }
    /**
     * This method expects a transaction in JSON format and will attempt to apply it to the blockchain.
     * @param signatures signatures array of signatures required to authorize transaction
     * @param compression compression used, usually false
     * @param packedCtxFreeData packed_context_free_data: json of hex
     * @param packedTrx packed_trx: json of hex
     */
    pushTransaction(signatures, compression, packedCtxFreeData, packedTrx) {
        return this.CALL(mtd_1.EosModule.chain, mtd_1.EOSMethods.chain.sendTx, {
            compression,
            packed_context_free_data: packedCtxFreeData,
            packed_tx: packedTrx,
            signatures
        });
    }
    /**
     * Serializes json to binary hex.
     * The resulting binary hex is usually used for the data field in push_transaction.
     * @param code Account name
     * @param action action name
     * @param args json args
     */
    abiJSONToBin(code, action, args) {
        return this.CALL(mtd_1.EosModule.chain, mtd_1.EOSMethods.chain.atob, {
            action,
            args,
            code
        });
    }
    /**
     * Serializes binary hex to json.
     * @param code Account name
     * @param action action name
     * @param binargs binary args
     */
    abiBinToJSON(code, action, binargs) {
        return this.CALL(mtd_1.EosModule.chain, mtd_1.EOSMethods.chain.btoa, {
            action,
            binargs,
            code
        });
    }
    getTxInfo(id) {
        return this.CALL(mtd_1.EosModule.history, mtd_1.EOSMethods.history.tx, { id });
    }
    getControlledAccounts(account) {
        return this.CALL(mtd_1.EosModule.history, mtd_1.EOSMethods.history.ctrlAccounts, {
            controlling_account: account
        });
    }
}
exports.EOSClient = EOSClient;
