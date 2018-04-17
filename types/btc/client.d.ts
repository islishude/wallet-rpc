import * as BtcIfc from "./interface";
import Client, { RPC, isStringOfResult, isNumberOfResult } from "../client";
export default class BitcoinClient extends Client {
    constructor(user: string, pass: string, ip: string, port: number);
    getInfo(): Promise<RPC>;
    getBlockCount(): Promise<isNumberOfResult>;
    getBlockHash(height: number): Promise<isStringOfResult>;
    getBlockInfo(blockId: string): Promise<BtcIfc.getBlockInfo>;
    getTxInfo(txId: string): Promise<BtcIfc.getTxInfoRes>;
    sendRawTx(tx: string, id: string): Promise<string>;
}
