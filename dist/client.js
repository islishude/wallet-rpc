"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const helper_1 = require("./helper");
class RPCClient {
    constructor(user, pass, ip, port, coinName) {
        this.user = user;
        this.pass = pass;
        this.ip = ip;
        this.port = port;
        this.coinName = coinName;
        this.BulkData = [];
        this.reqConfig = {
            auth: {
                password: this.pass,
                username: this.user
            },
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "User-Agent": "wallet-rpc",
            },
            timeout: 60000
        };
        // if (/^https.+$/.test(this.ip)) {
        //   this.reqConfig.httpsAgent = new httpsAgent({ keepAlive: true });
        // } else {
        //   this.reqConfig.httpAgent = new httpAgent({ keepAlive: true });
        // }
        this.URL = /^http.+$/.test(this.ip)
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
            const ret = await axios_1.default.post(this.URL, reqData, this.reqConfig);
            return ret.data;
        }
        catch (err) {
            throw helper_1.RpcErrorCatch(err, this.URL, reqData, this.coinName);
        }
    }
    /**
     * Bulk rpc call addition
     * @param method
     * @param param
     * @param id
     */
    BulkAdd(data) {
        this.BulkData.push(data);
    }
    /**
     * Bulk RPC Call func
     * recommendation using it from same request bulk
     */
    async BulkRpcCall() {
        if (this.BulkData.length === 0) {
            return [];
        }
        const reqData = this.BulkData;
        // clear data
        this.BulkData = [];
        const res = await axios_1.default.post(this.URL, reqData, this.reqConfig);
        return res.data;
    }
    /**
     * RPC Request by user defined bulk data
     * here no using this.bulkData
     */
    async BulkRpcExec(data) {
        const res = await axios_1.default.post(this.URL, data, this.reqConfig);
        return res.data;
    }
}
exports.default = RPCClient;
