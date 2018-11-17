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
        catch (err) {
            throw helper_1.RpcErrorCatch(err, url, body, "EOS");
        }
    }
    /**
     * Returns an object containing various details about the blockchain.
     */
    getInfo() {
        return this.CALL(mtd_1.EOSModules.chain, mtd_1.EOSMethods.chain.info);
    }
    /**
     * Returns an object containing various details about a specific block on the blockchain.
     * @param id Provide a block number or a block id
     */
    getBlock(id) {
        return this.CALL(mtd_1.EOSModules.chain, mtd_1.EOSMethods.chain.block, {
            block_num_or_id: id
        });
    }
    /**
     * Returns an object containing various details about a specific account on the blockchain.
     */
    getAccountInfo(account) {
        return this.CALL(mtd_1.EOSModules.chain, mtd_1.EOSMethods.chain.account, {
            account_name: account
        });
    }
    /**
     * Get account list under public key provided
     * ref to `get_key_accounts`
     * @see https://developers.eos.io/eosio-nodeos/reference#get_key_accounts-1
     */
    getAccountsByPubKey(pubKey) {
        return this.CALL(mtd_1.EOSModules.history, mtd_1.EOSMethods.history.keyAccounts, {
            public_key: pubKey
        });
    }
    getCurrencyStats(code, symbol) {
        return this.CALL(mtd_1.EOSModules.chain, mtd_1.EOSMethods.chain.stats, {
            code,
            symbol
        });
    }
    /**
     * get ABI of providing account name
     * @param account
     */
    getABI(account) {
        return this.CALL(mtd_1.EOSModules.chain, mtd_1.EOSMethods.chain.abi, {
            account_name: account
        });
    }
    getCode(account) {
        return this.CALL(mtd_1.EOSModules.chain, mtd_1.EOSMethods.chain.code, {
            account_name: account
        });
    }
    getRawCodeAndABI(account) {
        return this.CALL(mtd_1.EOSModules.chain, mtd_1.EOSMethods.chain.rawCodeAndABI, {
            account_name: account
        });
    }
    getTableRows(data) {
        return this.CALL(mtd_1.EOSModules.chain, mtd_1.EOSMethods.chain.tableRows, data);
    }
    /**
     * Get block header state
     * @param id Provide a block number or a block id
     */
    getBlockHeaderState(id) {
        return this.CALL(mtd_1.EOSModules.chain, mtd_1.EOSMethods.chain.blockHeaderState, {
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
        return this.CALL(mtd_1.EOSModules.chain, mtd_1.EOSMethods.chain.balance, {
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
        return this.CALL(mtd_1.EOSModules.chain, mtd_1.EOSMethods.chain.sendTx, {
            compression,
            packed_context_free_data: packedCtxFreeData,
            packed_tx: packedTrx,
            signatures
        });
    }
    /**
     * Serializes json to binary hex.
     *
     * The resulting binary hex is usually used for the data field in push_transaction.
     * @param code Account name
     * @param action action name
     * @param args json args
     */
    abiJSONToBin(code, action, args) {
        return this.CALL(mtd_1.EOSModules.chain, mtd_1.EOSMethods.chain.atob, {
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
        return this.CALL(mtd_1.EOSModules.chain, mtd_1.EOSMethods.chain.btoa, {
            action,
            binargs,
            code
        });
    }
    getTxInfo(id) {
        return this.CALL(mtd_1.EOSModules.history, mtd_1.EOSMethods.history.tx, { id });
    }
    getControlledAccounts(account) {
        return this.CALL(mtd_1.EOSModules.history, mtd_1.EOSMethods.history.ctrlAccounts, {
            controlling_account: account
        });
    }
    async getRAMPrice() {
        const { rows } = await this.getTableRows(EOSClient.RAMFeeRequestData);
        const { base, quote } = rows[0];
        // RAM PRICE = (n * quote.balance) / (n + base.balance / 1024)
        const quoteBalance = Number(quote.balance.split(/\s/)[0]);
        const baseBalance = 1 + Number(base.balance.split(/\s/)[0]);
        return (quoteBalance / (baseBalance / 1024)).toFixed(4);
    }
    /**
     * Get NET And CPU price
     *
     * get these value should compute from a referer account,
     * so you can pass a EOS exchange platform account
     */
    async getNetAndCpuPrice(refAccount = "heztanrqgene") {
        const { net_limit, cpu_limit, net_weight, cpu_weight } = await this.getAccountInfo(refAccount);
        const netStaked = net_weight / 10000;
        // convert bytes to kilobytes
        const netAvailable = net_limit.max / 1024;
        const cpuStaked = cpu_weight / 10000;
        // convert microseconds to milliseconds
        const cpuAvailable = cpu_limit.max / 1000;
        if (cpuAvailable === 0 || netAvailable === 0) {
            throw new Error("[EOS::GetNetAndCpuPrice] Please check your refAccount and then call this.");
        }
        return {
            cpuPrice: (cpuStaked / cpuAvailable).toFixed(4),
            netPrice: (netStaked / netAvailable).toFixed(4)
        };
    }
    // get bp list
    // TODO: sorting and skip params
    async getProducerList(limit = 1000) {
        return this.getTableRows({
            code: "eosio",
            json: true,
            limit,
            lower_bound: 0,
            scope: "eosio",
            table: "producers",
            upper_bound: -1
        });
    }
}
EOSClient.RAMFeeRequestData = {
    code: "eosio",
    json: true,
    scope: "eosio",
    table: "rammarket"
};
exports.EOSClient = EOSClient;
