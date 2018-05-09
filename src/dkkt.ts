import { DKKToken } from "../defined/dkkt";
import { RPCResponse } from "../defined/rpc";
import Client from "./client";
import { BtcMtd } from "./methods";

export default class DKKTClient extends Client {
  constructor(user: string, pass: string, ip: string, port: number = 28880) {
    super(user, pass, ip, port);
  }

  public getInfo() {
    return this.RpcCall<DKKToken.WalletInfo>(BtcMtd.getInfo);
  }

  public getBlockCount() {
    return this.RpcCall<number>(BtcMtd.getBlockCount);
  }

  public getBlockHash(height: number) {
    return this.RpcCall(BtcMtd.getBlockHash, [height]);
  }

  public getBlockInfo(id: string) {
    return this.RpcCall<DKKToken.BlockInfo>(BtcMtd.getBlock, [id]);
  }

  public getTxInfo(id: string) {
    const param: [string, number] = [id, 1];
    const method: string = BtcMtd.getTransaction;
    return this.RpcCall<DKKToken.TxInfo>(method, param);
  }

  public sendRawTx(raw: string) {
    return this.RpcCall(BtcMtd.sendRawTransaction, [raw]);
  }

  public getRawMemPool(verbose: boolean = false) {
    const method: string = BtcMtd.getRawMemPool;
    const params = [verbose];
    return this.RpcCall<string[]>(method, params);
  }
}