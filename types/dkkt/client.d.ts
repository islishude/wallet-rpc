import * as DKKTIfc from "./interface";
import Client, { RPC } from "../client";
export default class DKKTClient extends Client {
    constructor(user: string, pass: string, ip: string, port: number);
    getInfo(): Promise<RPC>;
    getBlockCount(): Promise<string>;
    getBlockHash(height: number): Promise<RPC>;
    getBlock(blockId: string): Promise<DKKTIfc.getBlockInfo>;
    getTxInfo(txId: string): Promise<DKKTIfc.getTxInfoRes>;
    sendRawTx(tx: string, id: string): Promise<string>;
}
