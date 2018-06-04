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
    constructor(user, pass, ip, port) {
        this.user = user;
        this.pass = pass;
        this.ip = ip;
        this.port = port;
        this.uri = /^http.+$/.test(this.ip)
            ? `${this.ip}`
            : `http://${this.ip}`;
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
            const data = this.bulkData;
            this.bulkData = [];
            const res = yield axios_1.default.post(this.uri, data, this.reqConfig);
            return res.data;
        });
    }
    getErrorResponse(error) {
        if (error.response) {
            return error.response.data;
        }
    }
    BulkRpcExec(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield axios_1.default.post(this.uri, data, this.reqConfig);
            return res.data;
        });
    }
}
exports.default = Client;
