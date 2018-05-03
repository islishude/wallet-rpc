import Axios from "axios";
import { RPC } from "../defined/rpc";

export default abstract class Client {
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
    const uri: string = `http://${this.ip}:${this.port}`;
    const res = await Axios.post(
      uri,
      {
        id: id || Date.now().toString(),
        jsonrpc: "2.0",
        method,
        params: param || [],
      },
      {
        auth: {
          password: this.pass,
          username: this.user
        }
      }
    );
    return res.data;
  }
}
