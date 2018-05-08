import { Bitcoin } from "../defined/btc";
import { NumberResult, StringResult } from "../defined/rpc";
import Client from "./client";
export default class BitcoinClient extends Client {
    constructor(user: string, pass: string, ip: string, port?: number);
    getInfo(): Promise<Bitcoin.WalletInfo>;
    getBlockCount(): Promise<NumberResult>;
    getBlockHash(height: number): Promise<StringResult>;
    getBlockInfo(id: string): Promise<Bitcoin.BlockInfo>;
    getTxInfo(id: string, decode?: boolean): Promise<Bitcoin.TxInfo>;
    sendRawTx(raw: string, highFee?: boolean): Promise<StringResult>;
    getBlockchainInfo(): Promise<Bitcoin.BlockchainInfo>;
}
