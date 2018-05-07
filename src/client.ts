import Axios, { AxiosRequestConfig } from "axios";
import { RPCRequest, RPCResponse } from "../defined/rpc";

export default abstract class Client {
  protected uri: string = this.https
    ? "https"
    : "http" + "://" + this.ip + ":" + this.port;
  protected bulkData: RPCRequest[] = [];
  protected reqConfig: AxiosRequestConfig = {
    auth: {
      password: this.pass,
      username: this.user
    }
  };
  constructor(
    public user: string,
    public pass: string,
    public ip: string,
    public port: number,
    public https: boolean = false
  ) {}

  public async RpcCall(
    method: string,
    param?: any[],
    id?: number
  ): Promise<RPCResponse> {
    const data: RPCRequest = {
      id: id || Date.now(),
      jsonrpc: "2.0",
      method,
      params: param || []
    };

    const res = await Axios.post(this.uri, data, this.reqConfig);
    return res.data;
  }

  public BulkAdd(method: string, param?: any[], id?: number): void {
    const data: RPCRequest = {
      id: id || Date.now(),
      jsonrpc: "2.0",
      method,
      params: param || []
    };
    this.bulkData.push(data);
  }

  public async BulkRpcCall(): Promise<RPCResponse[]> {
    const data: RPCRequest[] = this.bulkData;
    // clear data
    this.bulkData = [];
    const res = await Axios.post(this.uri, data, this.reqConfig);
    return res.data;
  }
}
