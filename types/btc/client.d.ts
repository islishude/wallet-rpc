import * as BtcIfc from "./interface";
import Client, { RPC, StrRes, NumRes } from "../client";
export default class BitcoinClient extends Client {
    constructor(user: string, pass: string, ip: string, port: number);
    getInfo(): Promise<RPC>;
    getBlockCount(): Promise<NumRes>;
    getBlockHash(height: number): Promise<StrRes>;
    getBlockInfo(id: string): Promise<BtcIfc.getBlockInfo>;
    getTxInfo(id: string): Promise<BtcIfc.getTxInfoRes>;
    sendRawTx(raw: string): Promise<string>;
}
