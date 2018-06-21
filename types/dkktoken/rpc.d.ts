import { DKKToken } from "../../defined/dkkt";
import { RPCResponse } from "../../defined/rpc";
import Client from "../client";
export declare class DKKTClient extends Client {
    constructor(user: string, pass: string, ip: string, port?: number, isHttps?: boolean);
    getInfo(): Promise<RPCResponse<DKKToken.WalletInfo>>;
    getBlockCount(): Promise<RPCResponse<number>>;
    getBlockHash(height: number): Promise<RPCResponse<string>>;
    getBlockInfo(id: string): Promise<RPCResponse<DKKToken.BlockInfo>>;
    getTxInfo(id: string): Promise<RPCResponse<DKKToken.TxInfo>>;
    sendRawTx(raw: string): Promise<RPCResponse<string>>;
    getMemPool(): Promise<RPCResponse<string[]>>;
}
