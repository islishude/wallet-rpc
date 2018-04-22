import axios from "axios";
import Client from "./client";
import { DKKT } from "../defined/dkkt";
import { Mtd } from "./methods";
import { RPC, NumRPC, StrRPC } from "../defined/rpc";

export default class DKKTClient extends Client {
  constructor(user: string, pass: string, ip: string, port: number) {
    super(user, pass, ip, port);
  }

  async getInfo() {
    return <Promise<DKKT.getInfoRes>>this.rpc(Mtd.getInfo);
  }

  async getBlockCount() {
    return <Promise<NumRPC>>this.rpc(Mtd.getBlockCount);
  }

  async getBlockHash(height: number) {
    return <Promise<StrRPC>>this.rpc(Mtd.getBlockHash, [height]);
  }

  async getBlockInfo(id: string) {
    return <Promise<DKKT.getBlockInfo>>this.rpc(Mtd.getBlock, [id]);
  }

  async getTxInfo(id: string) {
    const param: [string, number] = [id, 1];
    return <Promise<DKKT.getTxInfoRes>>this.rpc(Mtd.getTransaction, param);
  }

  async sendRawTx(raw: string) {
    return <Promise<string>>this.rpc(Mtd.sendRawTransaction, [raw]);
  }
}
