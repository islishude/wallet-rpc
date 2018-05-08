import { AxiosError, AxiosRequestConfig } from "axios";
import { RPCError, RPCRequest, RPCResponse } from "../defined/rpc";
export default abstract class Client {
    user: string;
    pass: string;
    ip: string;
    port: number;
    https: boolean;
    protected uri: string;
    protected bulkData: RPCRequest[];
    protected reqConfig: AxiosRequestConfig;
    constructor(user: string, pass: string, ip: string, port: number, https?: boolean);
    RpcCall(method: string, param?: any[], id?: number): Promise<RPCResponse>;
    BulkAdd(method: string, param?: any[], id?: number): void;
    BulkRpcCall(): Promise<RPCResponse[]>;
    getErrorResponse(error: AxiosError): RPCError;
}
