import { AxiosError } from "axios";
interface IWalletRpcError {
    message: string;
    request: {
        coinName: string;
        url: string;
        data: any;
    };
    response?: any;
    status?: number;
}
/**
 * @param {AxiosError} for https://github.com/axios/axios#handling-errors
 * @param {string} request path
 * @param {IRpcRequest} request data
 */
export declare const RpcErrorCatch: (err: AxiosError, url: string, data: any, coinName: string) => IWalletRpcError;
export {};
