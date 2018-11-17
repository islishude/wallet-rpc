import { AxiosError, AxiosResponse } from "axios";
import { isUndefined } from "util";
import { IRpcResponse } from "./client";

interface IWalletRpcError {
  message: string;
  request: {
    url: string;
    data: any;
  };
  response?: AxiosResponse<IRpcResponse>;
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
  data: any
): IWalletRpcError => {
  const { response, message } = err;

  const request = {
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
