import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import { Agent as httpAgent } from "http";
import { Agent as httpsAgent } from "https";
import { RPCError, RPCRequest, RPCResponse } from "../defined/rpc";

export default abstract class Client {
  protected uri: string = /^http.+$/.test(this.ip)
    ? `${this.ip}:${this.port}`
    : `http://${this.ip}:${this.port}`;
  protected bulkData: RPCRequest[] = [];
  protected reqConfig: AxiosRequestConfig = {
    auth: {
      password: this.pass,
      username: this.user
    },
    httpAgent: new httpAgent({ keepAlive: true }),
    httpsAgent: new httpsAgent({ keepAlive: true })
  };
  constructor(
    public user: string,
    public pass: string,
    public ip: string,
    public port: number
  ) {}

  public async RpcCall<T = string>(
    method: string,
    param?: any[],
    id?: number
  ): Promise<RPCResponse<T>> {
    const data: RPCRequest = {
      id: id || Date.now(),
      jsonrpc: "2.0",
      method,
      params: param || []
    };

    const res = await Axios.post(this.uri, data, this.reqConfig);
    return res.data;
  }

  /**
   * Bulk rpc call addition
   * @param method
   * @param param
   * @param id
   */
  public BulkAdd(method: string, param?: any[], id?: number): void {
    const data: RPCRequest = {
      id: id || Date.now(),
      jsonrpc: "2.0",
      method,
      params: param || []
    };
    this.bulkData.push(data);
  }

  /**
   * Bulk RPC Call func
   * recommendation using it from same request bulk
   */
  public async BulkRpcCall(): Promise<RPCResponse[]> {
    const data: RPCRequest[] = this.bulkData;
    // clear data
    this.bulkData = [];
    const res = await Axios.post(this.uri, data, this.reqConfig);
    return res.data;
  }

  /**
   * RPC Response error handler
   */
  public getErrorResponse(error: AxiosError): RPCError {
    if (error.response) {
      return error.response.data;
    }
  }

  /**
   * RPC Request by user defined bulk data
   * here no using this.bulkData
   */
  public async BulkRpcExec<D>(data: RPCRequest[]) {
    const res = await Axios.post(this.uri, data, this.reqConfig);
    return res.data as Promise<Array<RPCResponse<D>>>;
  }
}
