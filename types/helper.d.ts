import { AxiosError } from "axios";
interface IWalletRpcError {
    message: string;
    reason: string;
    request: {
        coinName: string;
        url: string;
        data: any;
    };
    response?: any;
    statusCode?: number;
}
export declare const RpcErrorCatch: (respErr: AxiosError, reqUrl: string, reqData: any, coinName: string) => IWalletRpcError;
export {};
