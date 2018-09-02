import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import { format } from "util";

export interface IRpcResponse<T = any> {
  jsonrpc?: string;
  id?: number | string;
  result: T;
  error?: IRpcErrorStruct;
}

export interface IRpcErrorStruct {
  code: number;
  message: string;
}

export interface IRpcError {
  jsonrpc?: string;
  id?: number | string;
  result: void;
  error: IRpcErrorStruct;
}

export interface IRpcRequest {
  jsonrpc?: "2.0" | "1.0";
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
  protected uri: string;
  protected bulkData: IRpcRequest[];
  protected reqConfig: AxiosRequestConfig;
  constructor(
    public user: string,
    public pass: string,
    public ip: string,
    public port: string
  ) {
    this.bulkData = [];
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
    this.uri = /^http.+$/.test(this.ip)
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
  public async RpcCall<T = string>(
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
        this.uri,
        reqData,
        this.reqConfig
      );
      return ret.data;
    } catch (e) {
      const { response, message } = e as AxiosError;
      const req: string = format("%s => %O", this.uri, reqData);

      if (response !== undefined) {
        // Catch non-200 error
        const status = response.status;
        const data = format("%O", response.data);
        throw new Error(
          `JSONRPC Response ${status} Error.\nReason: ${message}\nReqData: ${req}\nRespData: ${data}`
        );
      }

      throw new Error(
        `JSONRPC Request Error: \nReason:${message}\nReqData: ${req}`
      );
    }
  }

  /**
   * Bulk rpc call addition
   * @param method
   * @param param
   * @param id
   */
  public BulkAdd(method: string, param?: any[], id?: number | string): void {
    const data: IRpcRequest = {
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
  public async BulkRpcCall<T = any>() {
    const reqData: IRpcRequest[] = this.bulkData;
    // clear data
    this.bulkData = [];
    const res = await Axios.post<Array<IRpcResponse<T>>>(
      this.uri,
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
      this.uri,
      data,
      this.reqConfig
    );
    return res.data;
  }
}
