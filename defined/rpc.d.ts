export interface RPC {
  jsonrpc: string;
  result: any;
  error: null | { code: number; message: string };
}

export interface StringResult extends RPC {
  result: string;
}

export interface NumberResult extends RPC {
  result: number;
}
