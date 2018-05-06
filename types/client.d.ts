import { AxiosRequestConfig } from "axios";
import { RPCRequest, RPCResponse } from "../defined/rpc";
export default abstract class Client {
    user: string;
    pass: string;
    ip: string;
    port: number;
    https: boolean;
    static rpcData: RPCRequest;
    protected uri: string;
    protected bulkData: RPCRequest[];
    protected reqConfig: AxiosRequestConfig;
    constructor(user: string, pass: string, ip: string, port: number, https?: boolean);
    protected RpcCall(method: string, param?: any[], id?: number): Promise<RPCResponse>;
    protected BulkAdd(method: string, param?: any[], id?: number): void;
    protected BulkRpcCall(): Promise<RPCResponse[]>;
}
