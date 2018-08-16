"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const bignumber_js_1 = require("bignumber.js");
const client_1 = require("../client");
const mtd_1 = require("./mtd");
const util_1 = require("./util");
class EthereumClient extends client_1.default {
    constructor(ip, port = 8545, user = "", pass = "") {
        super(user, pass, ip, port);
    }
    syncProgress() {
        return this.RpcCall(mtd_1.EthereumMethods.info.syncing, []);
    }
    getBalance(address, status = "latest") {
        return this.RpcCall(mtd_1.EthereumMethods.address.balance, [address, status]);
    }
    getBlockCount() {
        return this.RpcCall(mtd_1.EthereumMethods.block.count);
    }
    getBlockByHash(hash, getFullTx = false) {
        const param = [hash, getFullTx];
        return this.RpcCall(mtd_1.EthereumMethods.block.byHash, param);
    }
    getBlock(symbol) {
        const param = [symbol, false];
        return this.RpcCall(mtd_1.EthereumMethods.block.byHeight, param);
    }
    getBlockVerbose(symbol) {
        const param = [symbol, true];
        return this.RpcCall(mtd_1.EthereumMethods.block.byHeight, param);
    }
    getTxByHash(hash) {
        return this.RpcCall(mtd_1.EthereumMethods.tx.byHash, [hash]);
    }
    getRawTxByHash(hash) {
        return this.RpcCall(mtd_1.EthereumMethods.tx.rawByHash, [hash]);
    }
    getTxReceipt(hash) {
        return this.RpcCall(mtd_1.EthereumMethods.tx.receipt, [hash]);
    }
    sendRawTx(raw) {
        return this.RpcCall(mtd_1.EthereumMethods.tx.sendRaw, [raw]);
    }
    sendTx(tx) {
        return this.RpcCall(mtd_1.EthereumMethods.tx.send, [tx]);
    }
    getAddrNonce(address, status = "latest") {
        const param = [address, status];
        return this.RpcCall(mtd_1.EthereumMethods.address.nonce, param);
    }
    getAddrNextNonce(address) {
        return this.RpcCall(mtd_1.EthereumMethods.address.parity.pendingNonce, [address]);
    }
    getCurrentGasPrice() {
        return this.RpcCall(mtd_1.EthereumMethods.gas.price, []);
    }
    callFunc(param, status = "latest") {
        return this.RpcCall(mtd_1.EthereumMethods.tx.call, [param, status]);
    }
    getCode(address, status) {
        return this.RpcCall(mtd_1.EthereumMethods.address.code, [address, status]);
    }
    async isContract(address) {
        const { result } = await this.getCode(address, "latest");
        if (result !== "0x") {
            return true;
        }
        return false;
    }
    getEstimateGas(param) {
        return this.RpcCall(mtd_1.EthereumMethods.gas.estimate, [param]);
    }
    signMessage(address, data) {
        assert_1.ok(util_1.isAddress(address), "Not a valid Ethereum address");
        return this.RpcCall(mtd_1.EthereumMethods.tool.sign, [address, data.toString("hex")]);
    }
    traceTx(txid, opt) {
        return this.RpcCall(mtd_1.EthereumMethods.debug.traceTx, [
            txid,
            opt
        ]);
    }
    traceTxByParity(txid) {
        return this.RpcCall(mtd_1.EthereumMethods.tx.parity.trace, [
            txid
        ]);
    }
    async ERC20Balance(token, address, isPending = true) {
        const status = isPending ? "pending" : "latest";
        const param = {
            data: util_1.ERC20FuncSig.balanceOf + util_1.padAddress(address),
            to: token
        };
        const { result: balance } = await this.callFunc(param, status);
        return balance;
    }
    async ERC20Decimals(token) {
        const param = {
            data: util_1.ERC20FuncSig.decimals,
            to: token
        };
        const PARAM = {
            data: util_1.ERC20FuncSigUpper.DECIMALS,
            to: token
        };
        const [{ result: decimals }, { result: DECIMALS }] = await Promise.all([
            this.callFunc(param),
            this.callFunc(PARAM)
        ]);
        if (decimals === "0x" && DECIMALS === "0x") {
            return undefined;
        }
        return util_1.hexToNumber(decimals === "0x" ? DECIMALS : decimals);
    }
    async ERC20TotalSupply(token) {
        const param = {
            data: util_1.ERC20FuncSig.totalSupply,
            to: token
        };
        const { result: totalSupply } = await this.callFunc(param);
        if (totalSupply === "0x") {
            return undefined;
        }
        return util_1.hexToDecimalString(totalSupply);
    }
    async ERC20Name(token) {
        const param = {
            data: util_1.ERC20FuncSig.name,
            to: token
        };
        const PARAM = {
            data: util_1.ERC20FuncSigUpper.NAME,
            to: token
        };
        const [{ result: name }, { result: NAME }] = await Promise.all([
            this.callFunc(param),
            this.callFunc(PARAM)
        ]);
        if (name === "0x" && NAME === "0x") {
            return undefined;
        }
        return util_1.toUtf8(name === "0x" ? NAME : name);
    }
    async ERC20Symbol(token) {
        const param = {
            data: util_1.ERC20FuncSig.symbol,
            to: token
        };
        const PARAM = {
            data: util_1.ERC20FuncSigUpper.SYMBOL,
            to: token
        };
        const [{ result: symbol }, { result: SYMBOL }] = await Promise.all([
            this.callFunc(param),
            this.callFunc(PARAM)
        ]);
        if (symbol === "0x" && SYMBOL === "0x") {
            return undefined;
        }
        return util_1.toUtf8(symbol === "0x" ? SYMBOL : symbol);
    }
    async ERC20TokenInfo(token) {
        const [name, symbol, decimals, totalSupply] = await Promise.all([
            this.ERC20Name(token),
            this.ERC20Symbol(token),
            this.ERC20Decimals(token),
            this.ERC20TotalSupply(token)
        ]);
        return {
            address: token,
            decimals,
            name: name || symbol,
            symbol: symbol || name,
            totalSupply: totalSupply === undefined || decimals === undefined
                ? undefined
                : new bignumber_js_1.default(totalSupply).div(new bignumber_js_1.default(10).pow(decimals)).toString(10)
        };
    }
}
exports.EthereumClient = EthereumClient;
