import http = require("http");
import https = require("https");
import { version as PkgVer } from "../version";
import { IJsonRpcClient } from "./ijsonrpc";
import { IMessage } from "./imsg";
import ReqData from "./reqdata";

export interface IClientConfig {
  timeout: number;
  keepAlive: boolean;
  host: string;
  username?: string;
  password?: string;
}

export default class Client implements IJsonRpcClient {
  protected options: http.RequestOptions;
  protected host: string;
  protected httpAgent: http.Agent;
  private httpClient: typeof http | typeof https;

  constructor(config: IClientConfig) {
    const { host, username, password, keepAlive, timeout } = config;
    this.host = host;
    this.httpClient = /^https:.+$/g.test(host) ? https : http;
    this.httpAgent = new this.httpClient.Agent({ keepAlive, timeout });

    this.options = {
      agent: this.httpAgent,
      auth:
        config.username && config.password
          ? `${username}@${password}`
          : undefined,
      headers: {
        "Accept": "application/json",
        "Accept-Encoding": "identity",
        "Agent": `wallet-rpc/${PkgVer}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      timeout,
    };
  }

  public Call<T>(reqData: ReqData) {
    return new Promise<IMessage<T>>((resolve, reject) => {
      const data = reqData.getData();
      const client = this.httpClient.request(
        this.host,
        this.options,
        async (res) => {
          try {
            const chunk: Buffer[] = [];
            for await (const tmp of res) {
              chunk.push(tmp);
            }
            const returns: IMessage<T> = {
              body: JSON.parse(Buffer.concat(chunk).toString()),
              headers: res.headers,
              statusCode: res.statusCode as number,
            };
            resolve(returns);
          } catch (e) {
            reject(e);
          }
        },
      );

      client.setHeader("Content-Length", Buffer.byteLength(data));
      client.write(data);

      client.on("timeout", () => reject(new Error("timeout")));
    });
  }

  public Close() {
    this.httpAgent.destroy();
  }
}
