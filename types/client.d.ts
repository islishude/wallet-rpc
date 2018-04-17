export default abstract class Client {
    user: string;
    pass: string;
    ip: string;
    port: number;
    protected auth: Auth;
    constructor(user: string, pass: string, ip: string, port: number);
    protected rpc<T, D>(method: string, param?: T[], id?: string): Promise<D>;
    abstract getInfo(): Promise<RPC>;
    abstract getBlockHash(height: number): Promise<RPC>;
    abstract getTxInfo(txId: string): Promise<RPC>;
    abstract getBlock(blockId: string): Promise<RPC>;
    abstract getBlockCount(): Promise<string>;
    abstract sendRawTx(tx: string, id: string): Promise<string>;
}
export interface RPC {
    jsonrpc: string;
    result: object;
    error: null | {
        code: number;
        message: string;
    };
}
export interface Auth {
    username: string;
    password: string;
}
