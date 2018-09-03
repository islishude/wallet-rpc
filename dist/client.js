"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const util_1 = require("util");
class RPCClient {
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
        // if (/^https.+$/.test(this.ip)) {
        //   this.reqConfig.httpsAgent = new httpsAgent({ keepAlive: true });
        // } else {
        //   this.reqConfig.httpAgent = new httpAgent({ keepAlive: true });
        // }
        this.uri = /^http.+$/.test(this.ip)
            ? `${this.ip}:${this.port}`
            : `http://${this.ip}:${this.port}`;
    }
    /**
     * JSON-RPC call func
     * @param method RPC Request Method
     * @param params RPC Request Params
     * @param id RPC Request id
     * @returns RPCResponse<T>
     * @throws Response non-2xx response or request error
     */
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
            const { response, message } = e;
            const req = util_1.format("%s => %O", this.uri, reqData);
            if (response !== undefined) {
                // Catch non-200 error
                const status = response.status;
                const data = util_1.format("%O", response.data);
                throw new Error(`JSONRPC Response ${status} Error.\nReason: ${message}\nReqData: ${req}\nRespData: ${data}`);
            }
            throw new Error(`JSONRPC Request Error: \nReason:${message}\nReqData: ${req}`);
        }
    }
    /**
     * Bulk rpc call addition
     * @param method
     * @param param
     * @param id
     */
    BulkAdd(data) {
        this.bulkData.push(data);
    }
    /**
     * Bulk RPC Call func
     * recommendation using it from same request bulk
     */
    async BulkRpcCall() {
        if (this.bulkData.length === 0) {
            return [];
        }
        const reqData = this.bulkData;
        // clear data
        this.bulkData = [];
        const res = await axios_1.default.post(this.uri, reqData, this.reqConfig);
        return res.data;
    }
    /**
     * RPC Request by user defined bulk data
     * here no using this.bulkData
     */
    async BulkRpcExec(data) {
        const res = await axios_1.default.post(this.uri, data, this.reqConfig);
        return res.data;
    }
}
exports.default = RPCClient;
