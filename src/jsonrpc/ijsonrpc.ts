import { IMessage } from "./imsg";
import ReqData from "./reqdata";

export interface IJsonRpcClient {
  Call<T>(reqData: ReqData): Promise<IMessage<T>>;
  Close(): void;
}
