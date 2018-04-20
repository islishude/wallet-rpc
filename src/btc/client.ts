import axios from "axios";
import * as BtcIfc from "./interface";
import methods from "../methods";
import Client, { RPC, StrRes, NumRes } from "../client";

export default class BitcoinClient extends Client {
  constructor(user: string, pass: string, ip: string, port: number) {
    super(user, pass, ip, port);
  }

  async getInfo() {
    return <Promise<RPC>>this.rpc(methods.getInfo);
  }

  async getBlockCount() {
    return <Promise<NumRes>>this.rpc(methods.getBlockCount);
  }

  async getBlockHash(height: number) {
    return <Promise<StrRes>>this.rpc(methods.getBlockHash, [height]);
  }

  async getBlockInfo(id: string) {
    return <Promise<BtcIfc.getBlockInfo>>this.rpc(methods.getBlock, [id]);
  }

  async getTxInfo(id: string) {
    const param: [string, number] = [id, 1];
    return <Promise<BtcIfc.getTxInfoRes>>this.rpc(
      methods.getTransaction,
      param
    );
  }

  async sendRawTx(raw: string) {
    return <Promise<string>>this.rpc(methods.sendRawTransaction, [raw]);
  }
}
