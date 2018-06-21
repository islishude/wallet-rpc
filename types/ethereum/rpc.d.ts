import { Ethereum } from "../../defined/eth";
import { RPCResponse } from "../../defined/rpc";
import Client from "../client";
export declare class EthereumClient extends Client {
    constructor(ip: string, port?: number, user?: string, pass?: string, isHttps?: boolean);
    getBalance(address: string, status?: Ethereum.Status): Promise<RPCResponse<string>>;
    getBlockCount(): Promise<RPCResponse<string>>;
    getBlockByHash(hash: string, getFullTx?: boolean): Promise<RPCResponse<Ethereum.IBlock>>;
    getBlock(symbol: string): Promise<RPCResponse<Ethereum.IBlockSimple>>;
    getBlockVerbose(symbol: string): Promise<RPCResponse<Ethereum.IBlockVerbose>>;
    getTxByHash(hash: string): Promise<RPCResponse<Ethereum.ITransaction>>;
    getTxReceipt(hash: string): Promise<RPCResponse<Ethereum.ITxReceipt>>;
    sendRawTx(raw: string): Promise<RPCResponse<string>>;
    sendTx(tx: Ethereum.ISentTxStruct): Promise<RPCResponse<string>>;
    getAddrNonce(address: string, status?: Ethereum.Status): Promise<RPCResponse<string>>;
    getCurrentGasPrice(): Promise<RPCResponse<string>>;
    callFunc(param: Ethereum.ICallFuncParam, status?: Ethereum.Status): Promise<RPCResponse<string>>;
    getCode(address: string, status: string): Promise<RPCResponse<string>>;
    getEstimateGas(param: Ethereum.ICallFuncParam, status?: Ethereum.Status): Promise<RPCResponse<string>>;
    traceTx(tx: string, opt?: {
        disableStorage?: boolean;
        disableMemory?: boolean;
        disableStack?: boolean;
        trace?: string;
        timeout?: string;
    }): Promise<RPCResponse<Ethereum.ITraceTxReturn>>;
    ERC20Balance(token: string, address: string, isPending?: boolean): Promise<string>;
    ERC20Decimals(token: string): Promise<number>;
    ERC20TotalSupply(token: string): Promise<string>;
    ERC20Name(token: string): Promise<string>;
    ERC20Symbol(token: string): Promise<string>;
    ERC20TokenInfo(token: string): Promise<{
        address: string;
        decimals: number;
        name: string;
        symbol: string;
        totalSupply: string;
    }>;
}
