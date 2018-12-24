import { AxiosRequestConfig } from "axios";
export interface IRpcResponse<T = any> {
    jsonrpc: string;
    id: number | string;
    result: T;
    error?: IRpcErrorStruct;
}
export interface IRpcErrorStruct {
    code: number;
    message: string;
}
export interface IRpcRequest {
    jsonrpc: "2.0" | "1.0";
    id: number | string;
    method: string;
    params: any[];
}
export interface IRpcConfig {
    ip?: string;
    port?: string;
    user?: string;
    pass?: string;
}
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
    RpcCall<T = any>(method: string, params?: any[], id?: number | string): Promise<IRpcResponse<T>>;
    /**
     * Bulk rpc call addition
     * @param method
     * @param param
     * @param id
     */
    BulkAdd(data: IRpcRequest): void;
    /**
     * Bulk RPC Call func
     * recommendation using it from same request bulk
     */
    BulkRpcCall<T = any>(): Promise<IRpcResponse<T>[]>;
    /**
     * RPC Request by user defined bulk data
     * here no using this.bulkData
     */
    BulkRpcExec<T = any>(data: IRpcRequest[]): Promise<IRpcResponse<T>[]>;
}
