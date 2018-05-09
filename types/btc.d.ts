import { Bitcoin } from "../defined/btc";
import { RPCResponse } from "../defined/rpc";
import Client from "./client";
export default class BitcoinClient extends Client {
    constructor(user: string, pass: string, ip: string, port?: number);
    getInfo(): Promise<RPCResponse<Bitcoin.WalletInfo>>;
    getBlockCount(): Promise<RPCResponse<number>>;
    getBlockHash(height: number): Promise<RPCResponse<string>>;
    getBlockInfo(id: string): Promise<RPCResponse<Bitcoin.BlockInfo>>;
    getTxInfo(id: string, decode?: boolean): Promise<RPCResponse<Bitcoin.TxInfo>>;
    sendRawTx(raw: string, highFee?: boolean): Promise<RPCResponse<string>>;
    getBlockchainInfo(): Promise<RPCResponse<Bitcoin.BlockchainInfo>>;
    getRawMemPool(verbose?: boolean): Promise<RPCResponse<string[] | Bitcoin.verboseMemPool>>;
}
