import { IJsonRpcRequst } from "./imsg";

export default class ReqData {
  public id: string;
  public method: string;
  public params: any[];
  constructor(id: string, method: string, ...params: any[]) {
    this.id = id;
    this.method = method;
    this.params = params === undefined ? [] : params;
  }

  public getData(): Buffer {
    const data: IJsonRpcRequst = {
      id: this.id,
      jsonrpc: "2.0",
      method: this.method,
      params: this.params,
    };
    return Buffer.from(JSON.stringify(data));
  }
}
