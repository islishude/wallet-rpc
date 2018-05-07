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
class Client {
    constructor(user, pass, ip, port, https = false) {
        this.user = user;
        this.pass = pass;
        this.ip = ip;
        this.port = port;
        this.https = https;
        this.uri = this.https ? "https" : "http" + this.ip + this.port;
        this.bulkData = [];
        this.reqConfig = {
            auth: {
                password: this.pass,
                username: this.user
            }
        };
    }
    RpcCall(method, param, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                id: id || Date.now(),
                jsonrpc: "2.0",
                method,
                params: param || []
            };
            const res = yield axios_1.default.post(this.uri, data, this.reqConfig);
            return res.data;
        });
    }
    BulkAdd(method, param, id) {
        const data = {
            id: id || Date.now(),
            jsonrpc: "2.0",
            method,
            params: param || []
        };
        this.bulkData.push(data);
    }
    BulkRpcCall() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield axios_1.default.post(this.uri, this.bulkData, this.reqConfig);
            this.bulkData.splice(0, this.bulkData.length);
            return res.data;
        });
    }
}
Client.rpcData = {
    id: Date.now(),
    jsonrpc: "2.0",
    method: "",
    params: []
};
exports.default = Client;
