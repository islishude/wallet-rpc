import { AxiosError, AxiosResponse } from "axios";
import { IRpcResponse } from "./client";
interface IWalletRpcError {
    message: string;
    request: {
        url: string;
        data: any;
    };
    response?: AxiosResponse<IRpcResponse>;
    status?: number;
}
/**
 * @param {AxiosError} for https://github.com/axios/axios#handling-errors
 * @param {string} request path
 * @param {IRpcRequest} request data
 */
export declare const RpcErrorCatch: (err: AxiosError, url: string, data: any) => IWalletRpcError;
export {};
