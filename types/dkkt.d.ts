import Client from "./client";
import { DKKT } from "../defined/dkkt";
import { NumberResult, StringResult } from "../defined/rpc";
export default class DKKTClient extends Client {
    constructor(user: string, pass: string, ip: string, port: number);
    getInfo(): Promise<DKKT.WalletInfo>;
    getBlockCount(): Promise<NumberResult>;
    getBlockHash(height: number): Promise<StringResult>;
    getBlockInfo(id: string): Promise<DKKT.BlockInfo>;
    getTxInfo(id: string): Promise<DKKT.TxInfo>;
    sendRawTx(raw: string): Promise<string>;
}
