import axios from "axios";
import * as BtcIfc from "./interface";
import methods from "../methods";
import Client, { RPC } from "../client";

export default class BitcoinClient extends Client {
  constructor(user: string, pass: string, ip: string, port: number) {
    super(user, pass, ip, port);
  }

  async getInfo() {
    const method: string = methods.getInfo;
    return <Promise<RPC>>this.rpc(method);
  }

  async getBlockCount() {
    const method: string = methods.getBlockCount;
    return <Promise<string>>this.rpc(method);
  }

  async getBlockHash(height: number) {
    const method: string = methods.getBlockCount;
    const param: number[] = [height];
    return <Promise<string>>this.rpc(method, param);
  }

  async getBlock(blockId: string) {
    const method: string = methods.getBlock;
    const param: string[] = [blockId];
    return <Promise<BtcIfc.getBlockInfo>>this.rpc(method, param);
  }

  async getTxInfo(txId: string) {
    const method: string = methods.getTransaction;
    const param: [string, number] = [txId, 1];
    return <Promise<BtcIfc.getTxInfoRes>>this.rpc(method, param);
  }

  async sendRawTx(tx: string, id: string) {
    const method: string = methods.sendRawTransaction;
    const param: string[] = [tx];
    return <Promise<string>>this.rpc(method, param);
  }
}
