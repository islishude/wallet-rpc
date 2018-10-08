"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
/**
 *
 * @param e AxiosError instance https://github.com/axios/axios#handling-errors
 * @param url request path
 * @param reqData request data
 */
exports.HandleError = (e, url, reqData) => {
    const { response, message } = e;
    const req = util_1.format("%s => %O", url, reqData);
    if (util_1.isUndefined(response)) {
        return `JSONRPC Request Error: \nReason:${message}\nReqData: ${req}`;
    }
    // Catch non-200 error
    const status = response.status;
    const data = util_1.format("%O", response.data);
    return `JSONRPC Response ${status} Error.\nReason: ${message}\nReqData: ${req}\nRespData: ${data}`;
};
