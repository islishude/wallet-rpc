import { AxiosRequestConfig } from "axios";
import { RPCRequest, RPCResponse } from "../defined/rpc";
export default abstract class Client {
    user: string;
    pass: string;
    ip: string;
    port: number;
    protected uri: string;
    protected bulkData: RPCRequest[];
    protected reqConfig: AxiosRequestConfig;
    constructor(user: string, pass: string, ip: string, port: number);
    RpcCall<T = string>(method: string, params?: any[], id?: number | string): Promise<RPCResponse<T>>;
    BulkAdd(method: string, param?: any[], id?: number | string): void;
    BulkRpcCall<T = any>(): Promise<RPCResponse<T>[]>;
    BulkRpcExec<T = any>(data: RPCRequest[]): Promise<RPCResponse<T>[]>;
}
