import { Ethereum } from "../defined/eth";
import { RPCResponse } from "../defined/rpc";
import Client from "./client";
export default class EthereumClient extends Client {
    constructor(user: string, pass: string, ip: string, port?: number);
    getBlockCount(): Promise<RPCResponse<string>>;
    getBlockByHash(hash: string, isFullTransaction?: boolean): Promise<RPCResponse<Ethereum.IBlock>>;
    getUncleByBlockHashAndIndex(hash: string, index: string): Promise<RPCResponse<Ethereum.IBlock>>;
    getUncleByBlockNumberAndIndex(height: string, index: string): Promise<RPCResponse<Ethereum.IBlock>>;
    sendRawTx(raw: string): Promise<RPCResponse<string>>;
    sendTx(tx: Ethereum.ITxStruct): Promise<RPCResponse<string>>;
    getTxCount(address: string, status?: Ethereum.Status): Promise<RPCResponse<string>>;
    getCurrentGasPrice(): Promise<RPCResponse<string>>;
    callFunc(param: Ethereum.ICallFuncParam, status?: Ethereum.Status): Promise<RPCResponse<string>>;
}
