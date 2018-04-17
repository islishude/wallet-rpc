import axios from "axios";
import * as DKKTIfc from "./interface";
import methods from "../methods";
import Client, { RPC, isStringOfResult, isNumberOfResult } from "../client";

export default class DKKTClient extends Client {
  constructor(user: string, pass: string, ip: string, port: number) {
    super(user, pass, ip, port);
  }

  async getInfo() {
    return <Promise<DKKTIfc.getInfoRes>>this.rpc(methods.getInfo);
  }

  async getBlockCount() {
    return <Promise<isNumberOfResult>>this.rpc(methods.getBlockCount);
  }

  async getBlockHash(height: number) {
    return <Promise<isStringOfResult>>this.rpc(methods.getBlockHash, [height]);
  }

  async getBlockInfo(blockId: string) {
    return <Promise<DKKTIfc.getBlockInfo>>this.rpc(methods.getBlock, [blockId]);
  }

  async getTxInfo(txId: string) {
    const param: [string, number] = [txId, 1];
    return <Promise<DKKTIfc.getTxInfoRes>>this.rpc(
      methods.getTransaction,
      param
    );
  }

  async sendRawTx(tx: string, id: string) {
    return <Promise<string>>this.rpc(methods.sendRawTransaction, [tx]);
  }
}
