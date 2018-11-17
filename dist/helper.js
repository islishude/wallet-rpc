"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
/**
 * @param {AxiosError} for https://github.com/axios/axios#handling-errors
 * @param {string} request path
 * @param {IRpcRequest} request data
 */
exports.RpcErrorCatch = (err, url, data) => {
    const { response, message } = err;
    const request = {
        data,
        url
    };
    if (util_1.isUndefined(response)) {
        return {
            message,
            request
        };
    }
    // Catch non-200 error
    return {
        message,
        request,
        response: response.data,
        status: response.status
    };
};
