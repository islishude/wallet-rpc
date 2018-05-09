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

  public getTxInfo(id: string, decode: boolean = true) {
    const param: [string, boolean] = [id, decode];
    const method = BtcMtd.getTransaction;
    return this.RpcCall<Bitcoin.TxInfo>(method, param);
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
  public getRawMemPool(verbose: boolean = false) {
    const method: string = BtcMtd.getRawMemPool;
    const params = [verbose];
    return this.RpcCall<string[] | Bitcoin.verboseMemPool>(method, params);
  }
}
