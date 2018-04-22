export interface RPC {
  jsonrpc: string;
  result: {} | string | number;
  error: null | { code: number; message: string };
}

export interface StrRPC extends RPC {
  result: string;
}

export interface NumRPC extends RPC {
  result: number;
}
