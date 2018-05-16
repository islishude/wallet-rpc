import { Bitcoin } from "../defined/btc";
import { RPCResponse } from "../defined/rpc";
import Client from "./client";
import { BtcMtd, BtcMtd16 } from "./methods";

export default class BitcoinClient extends Client {
  constructor(user: string, pass: string, ip: string, port: number = 8332) {
    super(user, pass, ip, port);
  }

  public getInfo() {
    return this.RpcCall<Bitcoin.WalletInfo>(BtcMtd.getInfo);
  }

  public getBlockCount() {
    return this.RpcCall<number>(BtcMtd.getBlockCount);
  }

  public getBlockHash(height: number) {
    return this.RpcCall(BtcMtd.getBlockHash, [height]);
  }

  public getBlockInfo(id: string) {
    return this.RpcCall<Bitcoin.BlockInfo>(BtcMtd.getBlock, [id]);
  }

  // get transaction for bitcoin core 0.16
  // use getRawTransaction method and decode
  public getTxInfo(id: string) {
    const param: [string, boolean] = [id, true];
    const method = BtcMtd.getRawTransaction;
    return this.RpcCall<Bitcoin.TxInfo>(method, param);
  }

  public getRawTxInfo(id: string) {
    const param: [string, boolean] = [id, false];
    const method = BtcMtd.getRawTransaction;
    return this.RpcCall(method, param);
  }

  /**
   * send raw transaction
   * return the txid
   */
  public sendRawTx(raw: string, highFee: boolean = false) {
    const method: string = BtcMtd.sendRawTransaction;
    return this.RpcCall(method, [raw, highFee]);
  }

  public getBlockchainInfo() {
    const method: string = BtcMtd16.getBlockInfo;
    return this.RpcCall<Bitcoin.BlockchainInfo>(method);
  }

  /**
   * get all transaction ids in memory pool
   * as a json array of string transaction ids.
   */
  public getRawMemPool() {
    const method: string = BtcMtd.getRawMemPool;
    return this.RpcCall<string[]>(method, [false]);
  }

  public getVerboseMemPool() {
    const method: string = BtcMtd.getRawMemPool;
    return this.RpcCall<Bitcoin.verboseMemPool[]>(method, [true]);
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
   * higher feerate and is more likely to be sufficient for the desired
   * target, but is not as responsive to short term drops in the
   * prevailing fee market.
   * @see https://bitcoin-rpc.github.io/estimatesmartfee.html
   */
  public getEstimateFee(
    target: number = 6,
    mode: "ECONOMICAL" | "CONSERVATIVE" = "CONSERVATIVE"
  ) {
    const method: string = BtcMtd16.getEstimateFee;
    const params: [number, string] = [target, mode];
    return this.RpcCall<Bitcoin.fee>(method, params);
  }

  public decodeRawTx(tx: string, isWitness: boolean = false) {
    const method: string = BtcMtd.decodeRawTx;
    return this.RpcCall<Bitcoin.TxInfo>(method, [tx, isWitness]);
  }

  // get information about memory usage.
  public getMemoryInfo() {
    const method = BtcMtd16.getMemoryInfo;
    return this.RpcCall<Bitcoin.memoryInfo>(method);
  }
}
