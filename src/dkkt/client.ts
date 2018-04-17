import axios from "axios";
import * as DKKTIfc from "./interface";
import methods from "../methods";
import Client, { RPC } from "../client";

export default class DKKTClient extends Client {
  constructor(user: string, pass: string, ip: string, port: number) {
    super(user, pass, ip, port);
  }

  async getInfo() {
    return <Promise<DKKTIfc.getInfoRes>>this.rpc(methods.getInfo);
  }

  async getBlockCount() {
    return <Promise<RPC>>this.rpc(methods.getBlockCount);
  }

  async getBlockHash(height: number) {
    const param: number[] = [height];
    return <Promise<string>>this.rpc(methods.getBlockCount, param);
  }

  async getBlock(blockId: string) {
    const param: string[] = [blockId];
    return <Promise<DKKTIfc.getBlockInfo>>this.rpc(methods.getBlock, param);
  }

  async getTxInfo(txId: string) {
    const param: [string, number] = [txId, 1];
    return <Promise<DKKTIfc.getTxInfoRes>>this.rpc(methods.getTransaction, param);
  }

  async sendRawTx(tx: string, id: string) {
    const param: string[] = [tx];
    return <Promise<string>>this.rpc(methods.sendRawTransaction, param);
  }
}
