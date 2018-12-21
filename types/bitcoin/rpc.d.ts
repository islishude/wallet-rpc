import RPCClient from "../client";
import { IRpcConfig, IRpcResponse } from "../type";
import { IBtcBlockchainInfo, IBtcBlockInfo, IBtcFee, IBtcMemoryInfo, IBtcMemPoolInfo, IBtcTrxOut, IBtcTxInfo, IBtcVerboseMemPool, IBtcWalletInfo } from "./type";
export declare class BitcoinClient extends RPCClient {
    constructor(conf?: IRpcConfig);
    getInfo(): Promise<IRpcResponse<IBtcWalletInfo>>;
    getBlockCount(): Promise<IRpcResponse<number>>;
    getBlockHash(height: number): Promise<IRpcResponse<string>>;
    getBlockInfo(id: string): Promise<IRpcResponse<IBtcBlockInfo>>;
    getTxInfo(id: string): Promise<IRpcResponse<IBtcTxInfo>>;
    getRawTxInfo(id: string): Promise<IRpcResponse<string>>;
    /**
     * send raw transaction
     * return the txid
     */
    sendRawTx(raw: string, highFee?: boolean): Promise<IRpcResponse<string>>;
    getBlockchainInfo(): Promise<IRpcResponse<IBtcBlockchainInfo>>;
    /**
     * get all transaction ids in memory pool
     * as a json array of string transaction ids.
     */
    getMemPool(): Promise<IRpcResponse<string[]>>;
    getVerboseMemPool(): Promise<IRpcResponse<IBtcVerboseMemPool[]>>;
    /**
     * Estimates the approximate fee per kilobyte needed for a transaction to begin
     * confirmation within conf_target blocks if possible and return the number of blocks
     * for which the estimate is valid. Uses virtual transaction size as defined
     * in BIP 141 (witness data is discounted).
     * @param target  Confirmation target in blocks (1 - 1008)
     * @param mode default=CONSERVATIVE The fee estimate mode.
     * Whether to return a more conservative estimate which also satisfies
     * a longer history. A conservative estimate potentially returns a
     * higher fee rate and is more likely to be sufficient for the desired
     * target, but is not as responsive to short term drops in the
     * prevailing fee market.
     * @see https://bitcoin-rpc.github.io/estimatesmartfee.html
     */
    getEstimateFee(target?: number, mode?: "ECONOMICAL" | "CONSERVATIVE"): Promise<IRpcResponse<IBtcFee>>;
    decodeRawTx(tx: string, isWitness?: boolean): Promise<IRpcResponse<IBtcTxInfo>>;
    getMemoryInfo(): Promise<IRpcResponse<IBtcMemoryInfo>>;
    /**
     * Returns the hash of the best (tip) block in the longest blockchain.
     */
    getBestBlockHash(): Promise<IRpcResponse<string>>;
    /**
     * Returns details about an unspent transaction output.
     */
    getTxOut(txid: string, n: number, includeMempool?: boolean): Promise<IRpcResponse<IBtcTrxOut>>;
    getMemPoolInfo(): Promise<IRpcResponse<IBtcMemPoolInfo>>;
}
