import { DKKToken } from "../defined/dkkt";
import { NumberResult, RPCResponse, StringResult } from "../defined/rpc";
import Client from "./client";
import { BtcMtd } from "./methods";

export default class DKKTClient extends Client {
  constructor(user: string, pass: string, ip: string, port: number = 28880) {
    super(user, pass, ip, port);
  }

  public getInfo() {
    return this.RpcCall(BtcMtd.getInfo) as Promise<DKKToken.WalletInfo>;
  }

  public getBlockCount() {
    return this.RpcCall(BtcMtd.getBlockCount) as Promise<NumberResult>;
  }

  public getBlockHash(height: number) {
    return this.RpcCall(BtcMtd.getBlockHash, [height]) as Promise<StringResult>;
  }

  public getBlockInfo(id: string) {
    return this.RpcCall(BtcMtd.getBlock, [id]) as Promise<DKKToken.BlockInfo>;
  }

  public getTxInfo(id: string) {
    const param: [string, number] = [id, 1];
    return this.RpcCall(BtcMtd.getTransaction, param) as Promise<DKKToken.TxInfo>;
  }

  public sendRawTx(raw: string) {
    return this.RpcCall(BtcMtd.sendRawTransaction, [raw]) as Promise<string>;
  }

  
}
