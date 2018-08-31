"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const util_1 = require("util");
class Client {
    constructor(user, pass, ip, port) {
        this.user = user;
        this.pass = pass;
        this.ip = ip;
        this.port = port;
        this.bulkData = [];
        this.reqConfig = {
            auth: {
                password: this.pass,
                username: this.user
            },
            timeout: 60000
        };
        this.uri = /^http.+$/.test(this.ip)
            ? `${this.ip}:${this.port}`
            : `http://${this.ip}:${this.port}`;
    }
    async RpcCall(method, params, id) {
        const reqData = {
            id: id || Date.now(),
            jsonrpc: "2.0",
            method,
            params: params || []
        };
        try {
            const ret = await axios_1.default.post(this.uri, reqData, this.reqConfig);
            return ret.data;
        }
        catch (e) {
            const { response, message, request } = e;
            const req = util_1.format("%s => %O", this.uri, reqData);
            if (response !== undefined) {
                const sts = response.status;
                const data = util_1.format("%O", response.data);
                throw new Error(`JSONRPC Response ${sts} Error.\nRequest: ${req}\nResponse: ${data}`);
            }
            if (request !== undefined) {
                throw new Error(`JSONRPC Request Error.\nRequest: ${req}`);
            }
            throw new Error(`JSONRPC Error: \nMsg:${message}\nRequest: ${req}`);
        }
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
    async BulkRpcCall() {
        const reqData = this.bulkData;
        this.bulkData = [];
        const res = await axios_1.default.post(this.uri, reqData, this.reqConfig);
        return res.data;
    }
    async BulkRpcExec(data) {
        const res = await axios_1.default.post(this.uri, data, this.reqConfig);
        return res.data;
    }
}
exports.default = Client;
