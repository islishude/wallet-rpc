import axios from "axios";
import * as BtcIfc from "./interface";
import methods from "../methods";
import Client, { RPC, isStringOfResult, isNumberOfResult } from "../client";

export default class BitcoinClient extends Client {
  constructor(user: string, pass: string, ip: string, port: number) {
    super(user, pass, ip, port);
  }

  async getInfo() {
    return <Promise<RPC>>this.rpc(methods.getInfo);
  }

  async getBlockCount() {
    return <Promise<isNumberOfResult>>this.rpc(methods.getBlockCount);
  }

  async getBlockHash(height: number) {
    return <Promise<isStringOfResult>>this.rpc(methods.getBlockHash, [height]);
  }

  async getBlockInfo(blockId: string) {
    return <Promise<BtcIfc.getBlockInfo>>this.rpc(methods.getBlock, [blockId]);
  }

  async getTxInfo(txId: string) {
    const param: [string, number] = [txId, 1];
    return <Promise<BtcIfc.getTxInfoRes>>this.rpc(
      methods.getTransaction,
      param
    );
  }

  async sendRawTx(tx: string, id: string) {
    return <Promise<string>>this.rpc(methods.sendRawTransaction, [tx]);
  }
}
