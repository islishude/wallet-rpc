import { AxiosRequestConfig } from "axios";
import { IRpcRequest, IRpcResponse } from "./type";
export default abstract class RPCClient {
    user: string;
    pass: string;
    ip: string;
    port: string;
    coinName: string;
    protected URL: string;
    protected BulkData: IRpcRequest[];
    protected reqConfig: AxiosRequestConfig;
    constructor(user: string, pass: string, ip: string, port: string, coinName: string);
    /**
     * JSON-RPC call func
     * @param method RPC Request Method
     * @param params RPC Request Params
     * @param id RPC Request id
     * @returns RPCResponse<T>
     * @throws Response non-2xx response or request error
     */
    RpcCall<T = any>(method: string, params?: any[], id?: number | string): Promise<IRpcResponse<T>>;
    /**
     * RPC Request by user defined bulk data
     * here no using this.bulkData
     */
    BulkRpcExec<T = any>(data: IRpcRequest[]): Promise<IRpcResponse<T>[]>;
}
