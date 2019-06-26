import { IMessage } from "./imsg";

export interface IJsonRpcClient {
  Call<T>(data: Buffer): Promise<IMessage<T>>;
  Close(): void;
  setAuth(username: string, password: string): void;
  setUrl(url: string): void;
}
