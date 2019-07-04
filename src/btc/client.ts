import { HttpClient } from "../jsonrpc/client";
import { IJsonRpcClient } from "../jsonrpc/ijsonrpc";
import { ReqData } from "../jsonrpc/reqdata";
import {
  IBtcBlockchainInfo,
  IBtcBlockInfo,
  IBtcFee,
  IBtcMemoryInfo,
  IBtcMemPoolInfo,
  IBtcTrxOut,
  IBtcTxInfo,
  IBtcVerboseMemPool,
} from "./type";

export class BitcoinClient {
  public client: IJsonRpcClient;

  constructor(client?: IJsonRpcClient) {
    this.client = client || new HttpClient({ url: "http://127.0.0.1:8332" });
  }

  public getBlockchainInfo() {
    const reqData = new ReqData("", "getblockchaininfo");
    return this.client.Call<IBtcBlockchainInfo>(reqData.getData());
  }

  public getMemoryInfo() {
    const reqData = new ReqData("", "getmemoryinfo");
    return this.client.Call<IBtcMemoryInfo>(reqData.getData());
  }

  public getMemPoolInfo() {
    const reqData = new ReqData("", "getmempoolinfo");
    return this.client.Call<IBtcMemPoolInfo>(reqData.getData());
  }

  public getBestBlockHash() {
    const reqData = new ReqData("", "getbestblockhash");
    return this.client.Call<string>(reqData.getData());
  }

  public getBlockCount() {
    const reqData = new ReqData("", "getblockcount");
    return this.client.Call<number>(reqData.getData());
  }

  public getBlockHash(height: number) {
    const reqData = new ReqData("", "getblockhash", height);
    return this.client.Call<string>(reqData.getData());
  }

  public getBlock(hash: string) {
    const reqData = new ReqData("", "getblock", hash);
    return this.client.Call<IBtcBlockInfo>(reqData.getData());
  }

  public getRawTrx<T extends boolean>(txid: string, verbose?: T) {
    const getVerbose = Boolean(verbose);
    const reqData = new ReqData("", "getrawtransaction", txid, getVerbose);
    type R = T extends true ? IBtcTxInfo : string;
    return this.client.Call<R>(reqData.getData());
  }

  public sendRawTx(rawTrx: string, highFee: boolean = false) {
    const reqData = new ReqData("", "sendrawtransaction", rawTrx, highFee);
    return this.client.Call<string>(reqData.getData());
  }

  public getMemPool<T>(verbose: T) {
    const reqData = new ReqData("", "getrawmempool", verbose);
    type R = T extends true ? IBtcVerboseMemPool[] : string[];
    return this.client.Call<R>(reqData.getData());
  }

  public estimateFee(
    target: number = 6,
    mode: "ECONOMICAL" | "CONSERVATIVE" = "CONSERVATIVE",
  ) {
    const reqData = new ReqData("", "estimatesmartfee", target, mode);
    return this.client.Call<IBtcFee>(reqData.getData());
  }

  public decodeRawTrx(rawTrx: string, isWitness: boolean = false) {
    const reqData = new ReqData("", "decoderawtransaction", rawTrx, isWitness);
    return this.client.Call<IBtcTxInfo>(reqData.getData());
  }

  public getTxOut(txid: string, n: number, includeMempool: boolean = false) {
    const reqData = new ReqData("", "gettxout", txid, n, includeMempool);
    return this.client.Call<IBtcTrxOut>(reqData.getData());
  }
}
