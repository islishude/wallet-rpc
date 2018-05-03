import { Bitcoin } from "../defined/btc";
import { NumberResult, RPC, StringResult } from "../defined/rpc";
import Client from "./client";
import { Mtd } from "./methods";

export default class BitcoinClient extends Client {
  constructor(user: string, pass: string, ip: string, port: number = 8332) {
    super(user, pass, ip, port);
  }

  public getInfo() {
    return this.rpc(Mtd.getInfo) as Promise<Bitcoin.WalletInfo>;
  }

  public getBlockCount() {
    return this.rpc(Mtd.getBlockCount) as Promise<NumberResult>;
  }

  public getBlockHash(height: number) {
    return this.rpc(Mtd.getBlockHash, [height]) as Promise<StringResult>;
  }

  public getBlockInfo(id: string) {
    return this.rpc(Mtd.getBlock, [id]) as Promise<Bitcoin.BlockInfo>;
  }

  public getTxInfo(id: string) {
    const param: [string, number] = [id, 1];
    return this.rpc(Mtd.getTransaction, param) as Promise<Bitcoin.TxInfo>;
  }

  public sendRawTx(raw: string) {
    return this.rpc(Mtd.sendRawTransaction, [raw]) as Promise<string>;
  }
}
