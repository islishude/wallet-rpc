import Axios, { AxiosRequestConfig } from "axios";
import { HandleError } from "./helper";

export interface IRpcResponse<T = any> {
  jsonrpc: string;
  id: number | string;
  result: T;
  error?: IRpcErrorStruct;
}

export interface IRpcErrorStruct {
  code: number;
  message: string;
}

export interface IRpcRequest {
  jsonrpc: "2.0" | "1.0";
  id: number | string;
  method: string;
  params: any[];
}

export interface IRpcConfig {
  ip?: string;
  port?: string;
  user?: string;
  pass?: string;
}

export default abstract class RPCClient {
  protected URL: string;
  protected BulkData: IRpcRequest[];
  protected reqConfig: AxiosRequestConfig;
  constructor(
    public user: string,
    public pass: string,
    public ip: string,
    public port: string
  ) {
    this.BulkData = [];
    this.reqConfig = {
      auth: {
        password: this.pass,
        username: this.user
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
      return ret.data;
    } catch (e) {
      throw new Error(HandleError(e, this.URL, reqData));
    }
  }

  /**
   * Bulk rpc call addition
   * @param method
   * @param param
   * @param id
   */
  public BulkAdd(data: IRpcRequest): void {
    this.BulkData.push(data);
  }

  /**
   * Bulk RPC Call func
   * recommendation using it from same request bulk
   */
  public async BulkRpcCall<T = any>() {
    if (this.BulkData.length === 0) {
      return [];
    }
    const reqData: IRpcRequest[] = this.BulkData;
    // clear data
    this.BulkData = [];
    const res = await Axios.post<Array<IRpcResponse<T>>>(
      this.URL,
      reqData,
      this.reqConfig
    );
    return res.data;
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
