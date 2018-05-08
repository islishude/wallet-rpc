import { Ethereum } from "../defined/eth";
import { StringResult } from "../defined/rpc";
import Client from "./client";
export default class EthereumClient extends Client {
    constructor(user: string, pass: string, ip: string, port?: number);
    getBlockCount(): Promise<StringResult>;
    getBlockByHash(hash: string, isFullTransaction?: boolean): Promise<Ethereum.IBlock>;
    getUncleByBlockHashAndIndex(hash: string, index: string): Promise<Ethereum.IBlock>;
    getUncleByBlockNumberAndIndex(height: string, index: string): Promise<Ethereum.IBlock>;
    sendRawTx(raw: string): Promise<StringResult>;
    sendTransaction(tx: Ethereum.ITxStruct): Promise<StringResult>;
    getTransactionCount(address: string, status?: Ethereum.Status): Promise<StringResult>;
    getCurrentGasPrice(): Promise<StringResult>;
    callFunc(param: Ethereum.ICallFuncParam, status?: Ethereum.Status): Promise<StringResult>;
}
