import http = require("http");

interface ICommonFileds {
  id: string | number;
  jsonrpc: string;
}

export interface IJsonRpcRequst extends ICommonFileds {
  method: string;
  params: any[];
}

export interface IJsonRpcResponse<T> extends ICommonFileds {
  error?: {
    code: number;
    message: string;
  };
  result: T | null;
}

export interface IMessage<T> {
  statusCode: number;
  headers: http.IncomingHttpHeaders;
  body: IJsonRpcResponse<T>;
}

export interface IClientConfig {
  baseUrl: string;
  keepAlive?: boolean;
  timeout?: number;
  username?: string;
  password?: string;
}
