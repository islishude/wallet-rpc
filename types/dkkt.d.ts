import { DKKToken } from "../defined/dkkt";
import { NumberResult, StringResult } from "../defined/rpc";
import Client from "./client";
export default class DKKTClient extends Client {
    constructor(user: string, pass: string, ip: string, port?: number);
    getInfo(): Promise<DKKToken.WalletInfo>;
    getBlockCount(): Promise<NumberResult>;
    getBlockHash(height: number): Promise<StringResult>;
    getBlockInfo(id: string): Promise<DKKToken.BlockInfo>;
    getTxInfo(id: string): Promise<DKKToken.TxInfo>;
    sendRawTx(raw: string): Promise<string>;
}
