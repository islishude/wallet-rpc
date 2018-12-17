"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
function stringify(obj) {
    return util_1.inspect(obj, { depth: null });
}
exports.RpcErrorCatch = (respErr, reqUrl, reqData, coinName) => {
    const requestData = {
        coinName,
        data: reqData,
        url: reqUrl
    };
    if (util_1.isUndefined(respErr.response)) {
        const res = {
            reason: respErr.message,
            request: requestData
        };
        res.message = stringify(res);
        return res;
    }
    // Catch Non-200 response error
    const result = {
        reason: respErr.message,
        request: requestData,
        response: respErr.response.data,
        statusCode: respErr.response.status
    };
    result.message = stringify(result);
    return result;
};
