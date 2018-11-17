import { AxiosError } from "axios";
import { isUndefined } from "util";

interface IWalletRpcError {
  message: string;
  request: {
    coinName: string;
    url: string;
    data: any;
  };
  response?: any;
  status?: number;
}

/**
 * @param {AxiosError} for https://github.com/axios/axios#handling-errors
 * @param {string} request path
 * @param {IRpcRequest} request data
 */
export const RpcErrorCatch = (
  err: AxiosError,
  url: string,
  data: any,
  coinName: string
): IWalletRpcError => {
  const { response, message } = err;

  const request = {
    coinName,
    data,
    url
  };

  if (isUndefined(response)) {
    return {
      message,
      request
    };
  }
  // Catch non-200 error
  return {
    message,
    request,
    response: response.data,
    status: response.status
  };
};
