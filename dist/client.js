"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const http_1 = require("http");
const https_1 = require("https");
class Client {
    constructor(user, pass, ip, port, isHttps = false) {
        this.user = user;
        this.pass = pass;
        this.ip = ip;
        this.port = port;
        this.bulkData = [];
        this.reqConfig = {
            auth: {
                password: this.pass,
                username: this.user
            }
        };
        if (isHttps || /^https.+$/.test(this.ip)) {
            this.reqConfig.httpsAgent = new https_1.Agent({ keepAlive: true });
        }
        else {
            this.reqConfig.httpAgent = new http_1.Agent({ keepAlive: true });
        }
        this.uri = /^http.+$/.test(this.ip)
            ? `${this.ip}:${this.port}`
            : isHttps
                ? `https://${this.ip}:${this.port}`
                : `http://${this.ip}:${this.port}`;
    }
    async RpcCall(method, param, id) {
        const reqData = {
            id: id || Date.now(),
            jsonrpc: "2.0",
            method,
            params: param || []
        };
        const { data } = await axios_1.default.post(this.uri, reqData, this.reqConfig);
        return data;
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
        const { data } = await axios_1.default.post(this.uri, reqData, this.reqConfig);
        return data;
    }
    getErrorResponse(error) {
        if (error.response) {
            return error.response.data;
        }
    }
    async BulkRpcExec(data) {
        const res = await axios_1.default.post(this.uri, data, this.reqConfig);
        return res.data;
    }
}
exports.default = Client;
