export default abstract class Client {
    user: string;
    pass: string;
    ip: string;
    port: number;
    constructor(user: string, pass: string, ip: string, port: number);
    protected rpc<T, D>(method: string, param?: T[], id?: string): Promise<D>;
    abstract getInfo(): Promise<RPC>;
    abstract getBlockHash(height: number): Promise<RPC>;
    abstract getTxInfo(txId: string): Promise<RPC>;
    abstract getBlockInfo(blockId: string): Promise<RPC>;
    abstract getBlockCount(): Promise<RPC>;
    abstract sendRawTx(tx: string): Promise<string>;
}
export interface RPC {
    jsonrpc: string;
    result: {} | string | number;
    error: null | {
        code: number;
        message: string;
    };
}
export interface StrRes extends RPC {
    result: string;
}
export interface NumRes extends RPC {
    result: number;
}
