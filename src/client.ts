import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { isNullOrUndefined } from "util";
import { IWalletRpcError } from "./helper";
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
    public coinName: string,
  ) {
    this.BulkData = [];
    this.reqConfig = {
      auth: {
        password: this.pass,
        username: this.user,
      },
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "User-Agent": "wallet-rpc",
      },
      timeout: 60000,
      validateStatus: () => true,
    };

    this.URL = /^http.+$/.test(this.ip)
      ? `${this.ip}:${this.port}`
      : `http://${this.ip}:${this.port}`;
  }

  public async RpcCall<T = any>(
    method: string,
    params?: any[],
    id?: number | string,
  ) {
    const reqData: IRpcRequest = {
      id: id || Date.now(),
      jsonrpc: "2.0",
      method,
      params: params || [],
    };

    let ret: AxiosResponse<IRpcResponse<T>>;
    try {
      ret = await Axios.post<IRpcResponse<T>>(
        this.URL,
        reqData,
        this.reqConfig,
      );
    } catch (err) {
      const e: IWalletRpcError = {
        message: err.message,
        reason: "reqeust error",
        request: {
          coinName: this.coinName,
          data: reqData,
          url: this.URL,
        },
        response: null,
        statusCode: 400,
      };
      throw e;
    }

    // Catch response error
    if (!isNullOrUndefined(ret.data.error)) {
      const err: IWalletRpcError = {
        message: ret.data.error.message || "Response error",
        reason: "Response error",
        request: {
          coinName: this.coinName,
          data: reqData,
          url: this.URL,
        },
        response: ret.data,
        statusCode: ret.status,
      };
      throw err;
    }
    return ret.data;
  }

  /**
   * RPC Request by user defined bulk data
   * here no using this.bulkData
   */
  public async BulkRpcExec<T = any>(data: IRpcRequest[]) {
    const res = await Axios.post<Array<IRpcResponse<T>>>(
      this.URL,
      data,
      this.reqConfig,
    );
    return res.data;
  }
}
