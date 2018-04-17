import axios from "axios";
import * as MyIfc from "./interface";
import methods from "../methods";

export default class BitcoinClient implements MyIfc.Client {
  protected auth: MyIfc.Auth = {
    username: this.user,
    password: this.pass
  };

  constructor(
    public user: string,
    public pass: string,
    public rpcIp: string,
    public rpcPort: number
  ) {}

  protected async rpc<T, D>(
    method: string,
    param?: T[],
    id?: string
  ): Promise<D> {
    const uri: string = this.rpcIp + this.rpcPort.toString();

    const res = await axios.post(
      uri,
      {
        method,
        id: id || Date.now().toString(),
        param: param || []
      },
      { auth: this.auth }
    );
    return res.data;
  }

  async getInfo() {
    const method: string = methods.getInfo;
    return <Promise<MyIfc.RPC>>this.rpc(method);
  }

  async getBlockCount() {
    const method: string = methods.getBlockCount;
    return <Promise<string>>this.rpc(method);
  }

  async getBlockHash(height: number) {
    const method: string = methods.getBlockCount;
    const param: number[] = [height];
    return <Promise<MyIfc.RPC>>this.rpc(method, param);
  }

  async getBlock(blockId: string) {
    const method: string = methods.getBlock;
    const param: string[] = [blockId];
    return <Promise<MyIfc.getBlockInfo>>this.rpc(method, param);
  }

  async getTxInfo(txId: string) {
    const method: string = methods.getTransaction;
    const param: [string, number] = [txId, 1];
    return <Promise<MyIfc.getTxInfoRes>>this.rpc(method, param);
  }

  async sendRawTx(tx: string, id: string) {
    const method: string = methods.sendRawTransaction;
    const param: string[] = [tx];
    return <Promise<string>>this.rpc(method, param);
  }
}
