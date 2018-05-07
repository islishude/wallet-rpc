import Axios, { AxiosRequestConfig } from "axios";
import { RPCRequest, RPCResponse } from "../defined/rpc";

export default abstract class Client {
  public static rpcData: RPCRequest = {
    id: Date.now(),
    jsonrpc: "2.0",
    method: "",
    params: []
  };

  protected uri: string = this.https ? "https" : "http" + this.ip + this.port;
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

  protected async RpcCall(
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

  protected BulkAdd(method: string, param?: any[], id?: number): void {
    const data: RPCRequest = {
      id: id || Date.now(),
      jsonrpc: "2.0",
      method,
      params: param || []
    };
    this.bulkData.push(data);
  }

  protected async BulkRpcCall(): Promise<RPCResponse[]> {
    const res = await Axios.post(this.uri, this.bulkData, this.reqConfig);
    // clear data
    this.bulkData.splice(0, this.bulkData.length);
    return res.data;
  }
}
