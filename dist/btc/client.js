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
const methods_1 = require("../methods");
const client_1 = require("../client");
class BitcoinClient extends client_1.default {
    constructor(user, pass, ip, port) {
        super(user, pass, ip, port);
    }
    getInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc(methods_1.default.getInfo);
        });
    }
    getBlockCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc(methods_1.default.getBlockCount);
        });
    }
    getBlockHash(height) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc(methods_1.default.getBlockHash, [height]);
        });
    }
    getBlockInfo(blockId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc(methods_1.default.getBlock, [blockId]);
        });
    }
    getTxInfo(txId) {
        return __awaiter(this, void 0, void 0, function* () {
            const param = [txId, 1];
            return this.rpc(methods_1.default.getTransaction, param);
        });
    }
    sendRawTx(tx, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc(methods_1.default.sendRawTransaction, [tx]);
        });
    }
}
exports.default = BitcoinClient;
