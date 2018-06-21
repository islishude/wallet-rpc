import { AxiosError, AxiosRequestConfig } from "axios";
import { RPCError, RPCRequest, RPCResponse } from "../defined/rpc";
export default abstract class Client {
    user: string;
    pass: string;
    ip: string;
    port: number;
    protected uri: string;
    protected bulkData: RPCRequest[];
    protected reqConfig: AxiosRequestConfig;
    constructor(user: string, pass: string, ip: string, port: number, isHttps?: boolean);
    RpcCall<T = string>(method: string, param?: any[], id?: number): Promise<RPCResponse<T>>;
    BulkAdd(method: string, param?: any[], id?: number): void;
    BulkRpcCall(): Promise<RPCResponse[]>;
    getErrorResponse(error: AxiosError): RPCError;
    BulkRpcExec<D>(data: RPCRequest[]): Promise<RPCResponse<D>[]>;
}
