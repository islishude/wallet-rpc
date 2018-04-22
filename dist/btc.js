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
const client_1 = require("./client");
const methods_1 = require("./methods");
class BitcoinClient extends client_1.default {
    constructor(user, pass, ip, port) {
        super(user, pass, ip, port);
    }
    getInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc(methods_1.Mtd.getInfo);
        });
    }
    getBlockCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc(methods_1.Mtd.getBlockCount);
        });
    }
    getBlockHash(height) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc(methods_1.Mtd.getBlockHash, [height]);
        });
    }
    getBlockInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc(methods_1.Mtd.getBlock, [id]);
        });
    }
    getTxInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const param = [id, 1];
            return this.rpc(methods_1.Mtd.getTransaction, param);
        });
    }
    sendRawTx(raw) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc(methods_1.Mtd.sendRawTransaction, [raw]);
        });
    }
}
exports.default = BitcoinClient;
