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
const axios_1 = require("axios");
const methods_1 = require("../methods");
class BitcoinClient {
    constructor(user, pass, rpcIp, rpcPort) {
        this.user = user;
        this.pass = pass;
        this.rpcIp = rpcIp;
        this.rpcPort = rpcPort;
        this.auth = {
            username: this.user,
            password: this.pass
        };
    }
    rpc(method, param, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = this.rpcIp + this.rpcPort.toString();
            const res = yield axios_1.default.post(uri, {
                method,
                id: id || Date.now().toString(),
                param: param || []
            }, { auth: this.auth });
            return res.data;
        });
    }
    getInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const method = methods_1.default.getInfo;
            return this.rpc(method);
        });
    }
    getBlockCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const method = methods_1.default.getBlockCount;
            return this.rpc(method);
        });
    }
    getBlockHash(height) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = methods_1.default.getBlockCount;
            const param = [height];
            return this.rpc(method, param);
        });
    }
    getBlock(blockId) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = methods_1.default.getBlock;
            const param = [blockId];
            return this.rpc(method, param);
        });
    }
    getTxInfo(txId) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = methods_1.default.getTransaction;
            const param = [txId];
            return this.rpc(method, param);
        });
    }
    sendRawTx(tx, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = methods_1.default.sendRawTransaction;
            const param = [tx];
            return this.rpc(method, param);
        });
    }
}
exports.default = BitcoinClient;
