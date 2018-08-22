"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
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
            id,
            jsonrpc: "2.0",
            method,
            params: params || []
        };
        try {
            const ret = await axios_1.default.post(this.uri, reqData, this.reqConfig);
            return ret.data;
        }
        catch (e) {
            const { response, message } = e;
            if (response !== undefined) {
                const { data, status } = response;
                throw new Error(`JSON RPC Response ${status} Error: data = ${JSON.stringify(data)}`);
            }
            throw new Error(`JSON RPC Request Error: ${message}`);
        }
    }
    BulkAdd(method, param, id) {
        const data = {
            id,
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
