import { AxiosError } from "axios";
import { IRpcRequest } from "./client";
/**
 *
 * @param e AxiosError instance https://github.com/axios/axios#handling-errors
 * @param url request path
 * @param reqData request data
 * Why not throw here inner?
 * in the words is for better type check
 * the type is:
 * function ThrowOuter(): Promise<string>
 * async function ThrowOuter() {
 *   try {
 *     const data = await Promise.resolve("any error");
 *     return data;
 *   } catch (e) {
 *     const msg = HandleError(e, "");
 *     throw new Error(msg);
 *   }
 * }
 *
 * the type is:
 * function ThrowInner(): Promise<string | undefined>
 * async function ThrowInner() {
 *   try {
 *     const data = await Promise.resolve("any error");
 *     return data;
 *   } catch (e) {
 *     HandleError(e, "");
 *   }
 * }
 */
export declare const HandleError: (e: AxiosError, url: string, reqData?: IRpcRequest | undefined) => string;
