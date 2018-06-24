export interface RPCResponse<T = any> {
  jsonrpc?: string;
  id?: number | string;
  result: T;
  error?: RPCErrorStruct;
}

export interface RPCErrorStruct {
  code: number;
  message: string;
}

export interface RPCError {
  jsonrpc?: string;
  id?: number | string;
  result: void;
  error: RPCErrorStruct;
}

export interface RPCRequest {
  jsonrpc?: "2.0" | "1.0";
  id?: number | string;
  method: string;
  params: any[];
}
