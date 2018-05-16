import { DKKToken } from "../defined/dkkt";
import { RPCResponse } from "../defined/rpc";
import Client from "./client";
export default class DKKTClient extends Client {
    constructor(user: string, pass: string, ip: string, port?: number);
    getInfo(): Promise<RPCResponse<DKKToken.WalletInfo>>;
    getBlockCount(): Promise<RPCResponse<number>>;
    getBlockHash(height: number): Promise<RPCResponse<string>>;
    getBlockInfo(id: string): Promise<RPCResponse<DKKToken.BlockInfo>>;
    getTxInfo(id: string): Promise<RPCResponse<DKKToken.TxInfo>>;
    getRawTxInfo(id: string): Promise<RPCResponse<string>>;
    sendRawTx(raw: string): Promise<RPCResponse<string>>;
    getRawMemPool(): Promise<RPCResponse<string[]>>;
}
