import { Ethereum } from "../defined/eth";
import { RPCResponse } from "../defined/rpc";
import Client from "./client";
export default class EthereumClient extends Client {
    constructor(ip: string, port?: number, user?: string, pass?: string);
    getBlockCount(): Promise<RPCResponse<string>>;
    getBlockByHash(hash: string, getFullTx?: boolean): Promise<RPCResponse<Ethereum.IBlock>>;
    getBlockByNumber(symbol: string, getFullTx?: boolean): Promise<RPCResponse<Ethereum.IBlock>>;
    getUncleByBlockHashAndIndex(hash: string, index: string): Promise<RPCResponse<Ethereum.IBlock>>;
    getUncleByBlockNumberAndIndex(height: string, index: string): Promise<RPCResponse<Ethereum.IBlock>>;
    sendRawTx(raw: string): Promise<RPCResponse<string>>;
    sendTx(tx: Ethereum.ITxStruct): Promise<RPCResponse<string>>;
    getTxCount(address: string, status?: Ethereum.Status): Promise<RPCResponse<string>>;
    getCurrentGasPrice(): Promise<RPCResponse<string>>;
    callFunc(param: Ethereum.ICallFuncParam, status?: Ethereum.Status): Promise<RPCResponse<string>>;
}
