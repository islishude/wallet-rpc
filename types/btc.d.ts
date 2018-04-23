import { BITCOIN } from "../defined/btc";
import Client from "./client";
import { NumberResult, StringResult } from "../defined/rpc";
export default class BitcoinClient extends Client {
    constructor(user: string, pass: string, ip: string, port: number);
    getInfo(): Promise<BITCOIN.WalletInfo>;
    getBlockCount(): Promise<NumberResult>;
    getBlockHash(height: number): Promise<StringResult>;
    getBlockInfo(id: string): Promise<BITCOIN.BlockInfo>;
    getTxInfo(id: string): Promise<BITCOIN.TxInfo>;
    sendRawTx(raw: string): Promise<string>;
}
