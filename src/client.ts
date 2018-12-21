import Axios, { AxiosRequestConfig } from "axios";
import { isNullOrUndefined } from "util";
import { RpcErrorCatch } from "./helper";
import { IRpcRequest, IRpcResponse } from "./type";

export default abstract class RPCClient {
  protected URL: string;
  protected BulkData: IRpcRequest[];
  protected reqConfig: AxiosRequestConfig;
  constructor(
    public user: string,
    public pass: string,
    public ip: string,
    public port: string,
    public coinName: string
  ) {
    this.BulkData = [];
    this.reqConfig = {
      auth: {
        password: this.pass,
        username: this.user
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "wallet-rpc"
      },
      timeout: 60000
    };

    // if (/^https.+$/.test(this.ip)) {
    //   this.reqConfig.httpsAgent = new httpsAgent({ keepAlive: true });
    // } else {
    //   this.reqConfig.httpAgent = new httpAgent({ keepAlive: true });
    // }
    this.URL = /^http.+$/.test(this.ip)
      ? `${this.ip}:${this.port}`
      : `http://${this.ip}:${this.port}`;
  }

  /**
   * JSON-RPC call func
   * @param method RPC Request Method
   * @param params RPC Request Params
   * @param id RPC Request id
   * @returns RPCResponse<T>
   * @throws Response non-2xx response or request error
   */
  public async RpcCall<T = any>(
    method: string,
    params?: any[],
    id?: number | string
  ) {
    const reqData: IRpcRequest = {
      id: id || Date.now(),
      jsonrpc: "2.0",
      method,
      params: params || []
    };

    try {
      const ret = await Axios.post<IRpcResponse<T>>(
        this.URL,
        reqData,
        this.reqConfig
      );

      // Catch has error in response but status code is 200
      if (!isNullOrUndefined(ret.data.error)) {
        throw { response: ret.data };
      }
      return ret.data;
    } catch (err) {
      throw RpcErrorCatch(err, this.URL, reqData, this.coinName);
    }
  }

  /**
   * RPC Request by user defined bulk data
   * here no using this.bulkData
   */
  public async BulkRpcExec<T = any>(data: IRpcRequest[]) {
    const res = await Axios.post<Array<IRpcResponse<T>>>(
      this.URL,
      data,
      this.reqConfig
    );
    return res.data;
  }
}
