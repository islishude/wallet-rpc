export interface _RPCResponse {
  jsonrpc: string;
  id?: number | string;
  result: any | string | number;
  error: null | { code: number; message: string };
}

export type RPCResponse = _RPCResponse | _RPCResponse[];

export interface StringResult extends _RPCResponse {
  result: string;
}

export interface NumberResult extends _RPCResponse {
  result: number;
}

export interface _RPCReq {
  jsonrpc: "2.0" | "1.0";
  id?: number | string;
  method: string;
  params: any[];
}

export type RPCRequest = _RPCReq | _RPCReq[];
