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
    jsonrpc: "2.0";
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
