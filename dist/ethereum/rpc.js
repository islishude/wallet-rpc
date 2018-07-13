"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = require("bignumber.js");
const client_1 = require("../client");
const mtd_1 = require("./mtd");
const util_1 = require("./util");
class EthereumClient extends client_1.default {
    constructor(ip, port = 30303, user = "", pass = "", isHttps = false) {
        super(user, pass, ip, port, isHttps);
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
    getCurrentGasPrice() {
        return this.RpcCall(mtd_1.EthereumMethods.gas.price, []);
    }
    callFunc(param, status = "latest") {
        return this.RpcCall(mtd_1.EthereumMethods.tx.call, [param, status]);
    }
    getCode(address, status) {
        return this.RpcCall(mtd_1.EthereumMethods.address.code, [address, status]);
    }
    getEstimateGas(param) {
        return this.RpcCall(mtd_1.EthereumMethods.gas.estimate, [param]);
    }
    traceTx(tx, opt) {
        return this.RpcCall(mtd_1.EthereumMethods.debug.traceTx, [tx, opt]);
    }
    ERC20Balance(token, address, isPending = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = isPending ? "pending" : "latest";
            const param = {
                data: util_1.ERC20FuncSig.balanceOf + util_1.padAddress(address),
                to: token
            };
            const { result: balance } = yield this.callFunc(param, status);
            return balance;
        });
    }
    ERC20Decimals(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const param = {
                data: util_1.ERC20FuncSig.decimals,
                to: token
            };
            const PARAM = {
                data: util_1.ERC20FuncSigUpper.DECIMALS,
                to: token
            };
            const [{ result: decimals }, { result: DECIMALS }] = yield Promise.all([
                this.callFunc(param),
                this.callFunc(PARAM)
            ]);
            if (decimals === "0x" && DECIMALS === "0x") {
                return 0;
            }
            return util_1.hexToNumber(decimals === "0x" ? DECIMALS : decimals);
        });
    }
    ERC20TotalSupply(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const param = {
                data: util_1.ERC20FuncSig.totalSupply,
                to: token
            };
            const { result: totalSupply } = yield this.callFunc(param);
            return util_1.hexToDecimalString(totalSupply);
        });
    }
    ERC20Name(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const param = {
                data: util_1.ERC20FuncSig.name,
                to: token
            };
            const PARAM = {
                data: util_1.ERC20FuncSigUpper.NAME,
                to: token
            };
            const [{ result: name }, { result: NAME }] = yield Promise.all([
                this.callFunc(param),
                this.callFunc(PARAM)
            ]);
            if (name === "0x" && NAME === "0x") {
                return "";
            }
            return util_1.toUtf8(name === "0x" ? NAME : name);
        });
    }
    ERC20Symbol(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const param = {
                data: util_1.ERC20FuncSig.symbol,
                to: token
            };
            const PARAM = {
                data: util_1.ERC20FuncSigUpper.SYMBOL,
                to: token
            };
            const [{ result: symbol }, { result: SYMBOL }] = yield Promise.all([
                this.callFunc(param),
                this.callFunc(PARAM)
            ]);
            if (symbol === "0x" && SYMBOL === "0x") {
                return "";
            }
            return util_1.toUtf8(symbol === "0x" ? SYMBOL : symbol);
        });
    }
    ERC20TokenInfo(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const [name, symbol, decimals, totalSupply] = yield Promise.all([
                this.ERC20Name(token),
                this.ERC20Symbol(token),
                this.ERC20Decimals(token),
                this.ERC20TotalSupply(token)
            ]);
            const total = totalSupply === "0"
                ? "0"
                : new bignumber_js_1.default(totalSupply).div(Math.pow(10, decimals)).toString(10);
            return {
                address: token,
                decimals,
                name: name || symbol,
                symbol,
                totalSupply: total
            };
        });
    }
}
exports.EthereumClient = EthereumClient;
