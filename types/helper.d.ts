import { AxiosError } from "axios";
import { IRpcRequest } from "./client";
/**
 *
 * @param e AxiosError instance https://github.com/axios/axios#handling-errors
 * @param url request path
 * @param reqData request data
 */
export declare const HandleError: (e: AxiosError, url: string, reqData?: IRpcRequest | undefined) => string;
