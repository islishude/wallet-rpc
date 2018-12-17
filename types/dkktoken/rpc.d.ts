import RPCClient, { IRpcConfig, IRpcResponse } from "../client";
import { IDkktBlockInfo, IDkktTxInfo, IDkktWalletInfo } from "./type";
export declare class DKKTClient extends RPCClient {
    constructor(conf?: IRpcConfig);
    getInfo(): Promise<IRpcResponse<IDkktWalletInfo>>;
    getBlockCount(): Promise<IRpcResponse<number>>;
    getBlockHash(height: number): Promise<IRpcResponse<string>>;
    getBlockInfo(id: string): Promise<IRpcResponse<IDkktBlockInfo>>;
    getTxInfo(id: string): Promise<IRpcResponse<IDkktTxInfo>>;
    sendRawTx(raw: string): Promise<IRpcResponse<string>>;
    getMemPool(): Promise<IRpcResponse<string[]>>;
}
