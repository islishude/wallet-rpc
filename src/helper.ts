import { AxiosError } from "axios";
import { inspect, isUndefined } from "util";

interface IWalletRpcError {
  message: string;
  reason: string;
  request: {
    coinName: string;
    url: string;
    data: any;
  };
  response?: any;
  statusCode?: number;
}

function stringify(obj: any): string {
  return inspect(obj, { depth: null });
}

export const RpcErrorCatch = (
  respErr: AxiosError,
  reqUrl: string,
  reqData: any,
  coinName: string
): IWalletRpcError => {
  const requestData = {
    coinName,
    data: reqData,
    url: reqUrl
  };

  if (isUndefined(respErr.response)) {
    const res: any = {
      reason: respErr.message,
      request: requestData
    };
    res.message = stringify(res);
    return res as IWalletRpcError;
  }

  // Catch Non-200 response error
  const result: any = {
    reason: respErr.message,
    request: requestData,
    response: respErr.response.data,
    statusCode: respErr.response.status
  };
  result.message = stringify(result);
  return result as IWalletRpcError;
};
