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
        this.URL = `${url}/${ver}`;
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
            throw new Error(helper_1.ErrorResolver(e, url));
        }
    }
    /**
     * Returns an object containing various details about the blockchain.
     */
    getInfo() {
        return this.CALL(mtd_1.EOSPlugins.chain, mtd_1.EOSMethods.chain.info);
    }
    /**
     * Returns an object containing various details about a specific block on the blockchain.
     * @param id Provide a block number or a block id
     */
    getBlock(id) {
        return this.CALL(mtd_1.EOSPlugins.chain, mtd_1.EOSMethods.chain.block, {
            block_num_or_id: id
        });
    }
    /**
     * Returns an object containing various details about a specific account on the blockchain.
     */
    getAccountInfo(account) {
        return this.CALL(mtd_1.EOSPlugins.chain, mtd_1.EOSMethods.chain.account, {
            account_name: account
        });
    }
    getAccountsByPubKey(pubKey) {
        return this.CALL(mtd_1.EOSPlugins.history, mtd_1.EOSMethods.history.tx, {
            public_key: pubKey
        });
    }
    getCurrencyStats(code, symbol) {
        return this.CALL(mtd_1.EOSPlugins.chain, mtd_1.EOSMethods.chain.stats, {
            code,
            symbol
        });
    }
    /**
     * get ABI of providing account name
     * @param account
     */
    getABI(account) {
        return this.CALL(mtd_1.EOSPlugins.chain, mtd_1.EOSMethods.chain.abi, {
            account_name: account
        });
    }
    getCode(account) {
        return this.CALL(mtd_1.EOSPlugins.chain, mtd_1.EOSMethods.chain.code, {
            account_name: account
        });
    }
    getRawCodeAndABI(account) {
        return this.CALL(mtd_1.EOSPlugins.chain, mtd_1.EOSMethods.chain.rawCodeAndABI, {
            account_name: account
        });
    }
    getTableRaws(data) {
        return this.CALL(mtd_1.EOSPlugins.chain, mtd_1.EOSMethods.chain.tableRows, data);
    }
    /**
     * Get block header state
     * @param id Provide a block number or a block id
     */
    getBlockHeaderState(id) {
        return this.CALL(mtd_1.EOSPlugins.chain, mtd_1.EOSMethods.chain.blockHeaderState, {
            block_num_or_id: id
        });
    }
    /**
     * Get Balance of your account with token symbol
     * @param code token account name
     * @param account your account name
     * @param symbol option token symbol
     * @returns string e.g. `1.0001 EOS`
     */
    getBalance(code, account, symbol) {
        return this.CALL(mtd_1.EOSPlugins.chain, mtd_1.EOSMethods.chain.balance, {
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
        return this.CALL(mtd_1.EOSPlugins.chain, mtd_1.EOSMethods.chain.sendTx, {
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
        return this.CALL(mtd_1.EOSPlugins.chain, mtd_1.EOSMethods.chain.atob, {
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
        return this.CALL(mtd_1.EOSPlugins.chain, mtd_1.EOSMethods.chain.btoa, {
            action,
            binargs,
            code
        });
    }
    getTxInfo(id) {
        return this.CALL(mtd_1.EOSPlugins.history, mtd_1.EOSMethods.history.tx, { id });
    }
    getControlledAccounts(account) {
        return this.CALL(mtd_1.EOSPlugins.history, mtd_1.EOSMethods.history.ctrlAccounts, {
            controlling_account: account
        });
    }
    async getRAMPrice() {
        const { rows } = await this.getTableRaws(EOSClient.RAMFeeRequestData);
        const { base, quote } = rows[0];
        // RAM PRICE = (n * quote.balance) / (n + base.balance / 1024)
        const quoteBalance = Number(quote.balance.split(/\s/)[0]);
        const baseBalance = (1 + Number(base.balance.split(/\s/)[0])) / 1024;
        return (quoteBalance / baseBalance).toFixed(4);
    }
    async getNETAndCPUPrice(refAccount = "eosnewyorkio") {
        const result = await this.getAccountInfo(refAccount);
        const netStaked = Number(result.total_resources.net_weight.split(/\s/)[0]);
        // convert bytes to kilobytes
        const netAvailable = result.net_limit.max / 1024;
        const cpuStaked = Number(result.total_resources.cpu_weight.split(/\s/)[0]);
        // convert microseconds to milliseconds
        const cpuAvailable = result.cpu_limit.max / 1000;
        return {
            cpuPrice: (cpuStaked / cpuAvailable).toFixed(4),
            netPrice: (netStaked / netAvailable).toFixed(4)
        };
    }
}
EOSClient.RAMFeeRequestData = {
    code: "eosio",
    json: true,
    scope: "eosio",
    table: "rammarket"
};
exports.EOSClient = EOSClient;
