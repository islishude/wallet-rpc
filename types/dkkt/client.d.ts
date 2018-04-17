import * as DKKTIfc from "./interface";
import Client, { isStringOfResult, isNumberOfResult } from "../client";
export default class DKKTClient extends Client {
    constructor(user: string, pass: string, ip: string, port: number);
    getInfo(): Promise<DKKTIfc.getInfoRes>;
    getBlockCount(): Promise<isNumberOfResult>;
    getBlockHash(height: number): Promise<isStringOfResult>;
    getBlockInfo(blockId: string): Promise<DKKTIfc.getBlockInfo>;
    getTxInfo(txId: string): Promise<DKKTIfc.getTxInfoRes>;
    sendRawTx(tx: string, id: string): Promise<string>;
}
