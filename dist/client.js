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
    }
    rpc(method, param, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = `http://${this.ip}:${this.port}`;
            const res = yield axios_1.default.post(uri, {
                id: id || Date.now().toString(),
                jsonrpc: "2.0",
                method,
                params: param || [],
            }, {
                auth: {
                    password: this.pass,
                    username: this.user
                }
            });
            return res.data;
        });
    }
}
exports.default = Client;
