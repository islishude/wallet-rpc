"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
/**
 *
 * @param e AxiosError instance https://github.com/axios/axios#handling-errors
 * @param url request path
 * @param reqData request data
 * Why not throw here inner?
 * in the words is for better type check
 * the type is:
 * function ThrowOuter(): Promise<string>
 * async function ThrowOuter() {
 *   try {
 *     const data = await Promise.resolve("any error");
 *     return data;
 *   } catch (e) {
 *     const msg = HandleError(e, "");
 *     throw new Error(msg);
 *   }
 * }
 *
 * the type is:
 * function ThrowInner(): Promise<string | undefined>
 * async function ThrowInner() {
 *   try {
 *     const data = await Promise.resolve("any error");
 *     return data;
 *   } catch (e) {
 *     HandleError(e, "");
 *   }
 * }
 */
exports.HandleError = (e, url, reqData) => {
    const { response, message } = e;
    const req = util_1.format("%s => %O", url, reqData);
    if (response !== void 0) {
        // Catch non-200 error
        const status = response.status;
        const data = util_1.format("%O", response.data);
        return `JSONRPC Response ${status} Error.\nReason: ${message}\nReqData: ${req}\nRespData: ${data}`;
    }
    return `JSONRPC Request Error: \nReason:${message}\nReqData: ${req}`;
};
