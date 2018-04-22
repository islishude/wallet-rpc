import { BITCOIN } from "../defined/btc";
import Client from "./client";
import { RPC, NumRPC, StrRPC } from "../defined/rpc";
export default class BitcoinClient extends Client {
    constructor(user: string, pass: string, ip: string, port: number);
    getInfo(): Promise<RPC>;
    getBlockCount(): Promise<NumRPC>;
    getBlockHash(height: number): Promise<StrRPC>;
    getBlockInfo(id: string): Promise<BITCOIN.getBlockInfo>;
    getTxInfo(id: string): Promise<BITCOIN.getTxInfoRes>;
    sendRawTx(raw: string): Promise<string>;
}
