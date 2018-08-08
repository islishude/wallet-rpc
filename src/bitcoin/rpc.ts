import { Bitcoin } from "../../defined/btc";
import { RPCResponse } from "../../defined/rpc";
import Client from "../client";
import { BitcoinMethods as mtd } from "./mtd";

export class BitcoinClient extends Client {
  constructor(user: string, pass: string, ip: string, port: number = 8332) {
    super(user, pass, ip, port);
  }

  public getInfo() {
    return this.RpcCall<Bitcoin.WalletInfo>(mtd.info.info);
  }

  public getBlockCount(): Promise<RPCResponse<number>> {
    return this.RpcCall<number>(mtd.block.count);
  }

  public getBlockHash(height: number) {
    return this.RpcCall(mtd.block.hash, [height]);
  }

  public getBlockInfo(id: string) {
    return this.RpcCall<Bitcoin.BlockInfo>(mtd.block.detail, [id]);
  }

  // get transaction for bitcoin core 0.16
  // use getRawTransaction method and decode
  public getTxInfo(id: string) {
    const param: [string, boolean] = [id, true];
    return this.RpcCall<Bitcoin.TxInfo>(mtd.tx.raw, param);
  }

  public getRawTxInfo(id: string) {
    const param: [string, boolean] = [id, false];
    return this.RpcCall<string>(mtd.tx.raw, param);
  }

  /**
   * send raw transaction
   * return the txid
   */
  public sendRawTx(raw: string, highFee: boolean = false) {
    return this.RpcCall(mtd.tx.sendRaw, [raw, highFee]);
  }

  public getBlockchainInfo() {
    return this.RpcCall<Bitcoin.BlockchainInfo>(mtd.info.chain);
  }

  /**
   * get all transaction ids in memory pool
   * as a json array of string transaction ids.
   */
  public getMemPool() {
    return this.RpcCall<string[]>(mtd.mempool.detail, [false]);
  }

  public getVerboseMemPool() {
    return this.RpcCall<Bitcoin.verboseMemPool[]>(mtd.mempool.detail, [true]);
  }

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
  public getEstimateFee(
    target: number = 6,
    mode: "ECONOMICAL" | "CONSERVATIVE" = "CONSERVATIVE"
  ) {
    const params: [number, string] = [target, mode];
    return this.RpcCall<Bitcoin.fee>(mtd.fee, params);
  }

  public decodeRawTx(tx: string, isWitness: boolean = false) {
    return this.RpcCall<Bitcoin.TxInfo>(mtd.tx.decode, [tx, isWitness]);
  }

  // get information about memory usage.
  public getMemoryInfo() {
    return this.RpcCall<Bitcoin.memoryInfo>(mtd.info.memory);
  }
}
