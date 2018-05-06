import { Bitcoin } from "../defined/btc";
import { NumberResult, RPCResponse, StringResult } from "../defined/rpc";
import Client from "./client";
import { BtcMtd, BtcMtd16 } from "./methods";

export default class BitcoinClient extends Client {
  constructor(user: string, pass: string, ip: string, port: number = 8332) {
    super(user, pass, ip, port);
  }

  public getInfo() {
    return this.RpcCall(BtcMtd.getInfo) as Promise<Bitcoin.WalletInfo>;
  }

  public getBlockCount() {
    return this.RpcCall(BtcMtd.getBlockCount) as Promise<NumberResult>;
  }

  public getBlockHash(height: number) {
    return this.RpcCall(BtcMtd.getBlockHash, [height]) as Promise<StringResult>;
  }

  public getBlockInfo(id: string) {
    return this.RpcCall(BtcMtd.getBlock, [id]) as Promise<Bitcoin.BlockInfo>;
  }

  public getTxInfo(id: string) {
    const param: [string, number] = [id, 1];
    const method = BtcMtd.getTransaction;
    return this.RpcCall(method, param) as Promise<Bitcoin.TxInfo>;
  }

  public sendRawTx(raw: string) {
    const method: string = BtcMtd.sendRawTransaction;
    return this.RpcCall(method, [raw]) as Promise<string>;
  }

  public getBlockchainInfo() {
    const method: string = BtcMtd16.getBlockInfo;
    return this.RpcCall(method) as Promise<Bitcoin.BlockchainInfo>;
  }
}
