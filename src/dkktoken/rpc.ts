import { DKKToken } from "../../defined/dkkt";
import { RPCResponse } from "../../defined/rpc";
import Client from "../client";
import { DKKTokenMethods as mtd } from "./mtd";

const { block, tx} = mtd;

export class DKKTClient extends Client {
  constructor(user: string, pass: string, ip: string, port: number = 28880) {
    super(user, pass, ip, port);
  }

  public getInfo() {
    return this.RpcCall<DKKToken.WalletInfo>(mtd.info);
  }

  public getBlockCount() {
    return this.RpcCall<number>(block.count);
  }

  public getBlockHash(height: number) {
    return this.RpcCall(block.hash, [height]);
  }

  public getBlockInfo(id: string) {
    return this.RpcCall<DKKToken.BlockInfo>(block.detail, [id]);
  }

  public getTxInfo(id: string) {
    const param: [string] = [id];
    return this.RpcCall<DKKToken.TxInfo>(tx.detail, param);
  }

  public sendRawTx(raw: string) {
    return this.RpcCall(tx.sendRaw, [raw]);
  }

  public getRawMemPool() {
    return this.RpcCall<string[]>(mtd.mempool);
  }
}
