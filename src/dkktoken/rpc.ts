import RPCClient, { IRpcConfig, IRpcResponse } from "../client";
import { DKKTokenMethods as mtd } from "./mtd";
import { IDkktBlockInfo, IDkktTxInfo, IDkktWalletInfo } from "./type";
export class DKKTClient extends RPCClient {
  constructor(conf: IRpcConfig = {}) {
    const ip = conf.ip || "http://127.0.0.1";
    const user = conf.user || "";
    const pass = conf.pass || "";
    const port = conf.port || "28880";
    super(user, pass, ip, port, "dkktoken");
  }

  public getInfo() {
    return this.RpcCall<IDkktWalletInfo>(mtd.info);
  }

  public getBlockCount(): Promise<IRpcResponse<number>> {
    return this.RpcCall<number>(mtd.block.count);
  }

  public getBlockHash(height: number) {
    return this.RpcCall<string>(mtd.block.hash, [height]);
  }

  public getBlockInfo(id: string) {
    return this.RpcCall<IDkktBlockInfo>(mtd.block.detail, [id]);
  }

  public getTxInfo(id: string) {
    const param: [string, number] = [id, 1];
    return this.RpcCall<IDkktTxInfo>(mtd.tx.detail, param);
  }

  public sendRawTx(raw: string) {
    return this.RpcCall<string>(mtd.tx.sendRaw, [raw]);
  }

  public getMemPool() {
    return this.RpcCall<string[]>(mtd.mempool);
  }
}
