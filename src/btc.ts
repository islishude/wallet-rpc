import { Bitcoin } from "../defined/btc";
import { NumberResult, RPC, StringResult } from "../defined/rpc";
import Client from "./client";
import { Mtd } from "./methods";

export default class BitcoinClient extends Client {
  constructor(user: string, pass: string, ip: string, port: number = 8332) {
    super(user, pass, ip, port);
  }

  public async getInfo() {
    return this.rpc(Mtd.getInfo) as Promise<Bitcoin.WalletInfo>;
  }

  public async getBlockCount() {
    return this.rpc(Mtd.getBlockCount) as Promise<NumberResult>;
  }

  public async getBlockHash(height: number) {
    return this.rpc(Mtd.getBlockHash, [height]) as Promise<StringResult>;
  }

  public async getBlockInfo(id: string) {
    return this.rpc(Mtd.getBlock, [id]) as Promise<Bitcoin.BlockInfo>;
  }

  public async getTxInfo(id: string) {
    const param: [string, number] = [id, 1];
    return this.rpc(
      Mtd.getTransaction,
      param
    ) as Promise<Bitcoin.TxInfo>;
  }

  public async sendRawTx(raw: string) {
    return this.rpc(Mtd.sendRawTransaction, [raw]) as Promise<string>;
  }
}
