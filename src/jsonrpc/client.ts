import http = require("http");
import https = require("https");
import { IJsonRpcClient } from "./ijsonrpc";
import { IClientConfig, IMessage } from "./imsg";
import { version as PkgVer } from "./version";

export class HttpClient implements IJsonRpcClient {
  public host: string;
  public options: http.RequestOptions;
  private httpAgent: http.Agent | https.Agent;
  private httpClient: typeof http | typeof https;

  constructor(config: IClientConfig) {
    const { host, username, password, keepAlive, timeout } = config;
    this.host = host;
    this.httpClient = /^https:.+$/g.test(host) ? https : http;
    this.httpAgent = new this.httpClient.Agent({
      keepAlive: keepAlive || false,
      timeout: timeout || 60000,
    });

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
    };
  }

  public setAuth(username: string, password: string) {
    this.options.auth = `${username}@${password}`;
  }

  public Call<T>(data: Buffer) {
    return new Promise<IMessage<T>>((resolve, reject) => {
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
