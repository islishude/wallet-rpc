import Axios from "axios";

export default abstract class Client {
  protected auth: Auth = {
    username: this.user,
    password: this.pass
  };

  constructor(
    public user: string,
    public pass: string,
    public ip: string,
    public port: number
  ) {}

  protected async rpc<T, D>(
    method: string,
    param?: T[],
    id?: string
  ): Promise<D> {
    const uri: string = this.ip + this.port;

    const res = await Axios.post(
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

  abstract async getInfo(): Promise<RPC>;
  abstract async getBlockHash(height: number): Promise<string>;
  abstract async getTxInfo(txId: string): Promise<RPC>;
  abstract async getBlock(blockId: string): Promise<RPC>;
  abstract async getBlockCount(): Promise<string>;
  abstract async sendRawTx(tx: string, id: string): Promise<string>;
}

export interface RPC {
  jsonrpc: string;
  result: object;
  error: null | { code: number; message: string };
}

export interface Auth {
  username: string;
  password: string;
}
