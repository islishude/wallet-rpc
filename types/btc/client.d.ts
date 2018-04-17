import * as BtcIfc from "./interface";
import Client, { RPC } from "../client";
export default class BitcoinClient extends Client {
    constructor(user: string, pass: string, ip: string, port: number);
    getInfo(): Promise<RPC>;
    getBlockCount(): Promise<string>;
    getBlockHash(height: number): Promise<string>;
    getBlock(blockId: string): Promise<BtcIfc.getBlockInfo>;
    getTxInfo(txId: string): Promise<BtcIfc.getTxInfoRes>;
    sendRawTx(tx: string, id: string): Promise<string>;
}
