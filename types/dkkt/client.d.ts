import * as DKKTIfc from "./interface";
import Client, { StrRes, NumRes } from "../client";
export default class DKKTClient extends Client {
    constructor(user: string, pass: string, ip: string, port: number);
    getInfo(): Promise<DKKTIfc.getInfoRes>;
    getBlockCount(): Promise<NumRes>;
    getBlockHash(height: number): Promise<StrRes>;
    getBlockInfo(id: string): Promise<DKKTIfc.getBlockInfo>;
    getTxInfo(id: string): Promise<DKKTIfc.getTxInfoRes>;
    sendRawTx(raw: string): Promise<string>;
}
