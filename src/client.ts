import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import { format } from "util";
import { RPCRequest, RPCResponse } from "../defined/rpc";

export default abstract class Client {
  protected uri: string;
  protected bulkData: RPCRequest[];
  protected reqConfig: AxiosRequestConfig;
  constructor(
    public user: string,
    public pass: string,
    public ip: string,
    public port: number
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
    const reqData: RPCRequest = {
      id: id || Date.now(),
      jsonrpc: "2.0",
      method,
      params: params || []
    };

    try {
      const ret = await Axios.post<RPCResponse<T>>(
        this.uri,
        reqData,
        this.reqConfig
      );
      return ret.data;
    } catch (e) {
      const { response, message, request } = e as AxiosError;
      const req: string = format("%s => %O", this.uri, reqData);

      if (response !== undefined) {
        const sts = response.status;
        const data = format("%O", response.data);
        throw new Error(
          `JSONRPC Response ${sts} Error.\nRequest: ${req}\nResponse: ${data}`
        );
      }

      if (request !== undefined) {
        throw new Error(`JSONRPC Request Error.\nRequest: ${req}`);
      }

      throw new Error(`JSONRPC Error: \nMsg:${message}\nRequest: ${req}`);
    }
  }

  /**
   * Bulk rpc call addition
   * @param method
   * @param param
   * @param id
   */
  public BulkAdd(method: string, param?: any[], id?: number | string): void {
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
  public async BulkRpcCall<T = any>() {
    const reqData: RPCRequest[] = this.bulkData;
    // clear data
    this.bulkData = [];
    const res = await Axios.post<Array<RPCResponse<T>>>(
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
  public async BulkRpcExec<T = any>(data: RPCRequest[]) {
    const res = await Axios.post<Array<RPCResponse<T>>>(
      this.uri,
      data,
      this.reqConfig
    );
    return res.data;
  }
}
