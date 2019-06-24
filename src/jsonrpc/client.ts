import http = require("http");
import https = require("https");
import url = require("url");
import { IJsonRpcClient } from "./ijsonrpc";
import { IClientConfig, IMessage } from "./imsg";
import { version as PkgVer } from "./version";

export class HttpClient implements IJsonRpcClient {
  public baseUrl: string;
  public options: http.RequestOptions;
  private httpAgent: http.Agent | https.Agent;
  private httpClient: typeof http | typeof https;

  constructor(config: IClientConfig) {
    const { baseUrl: host, username, password, keepAlive, timeout } = config;
    this.baseUrl = host;
    this.httpClient = /^https:.+$/g.test(host) ? https : http;
    this.httpAgent = new this.httpClient.Agent({
      keepAlive: keepAlive || false,
    });

    const urlPath = url.parse(this.baseUrl);

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
      host: urlPath.host,
      hostname: urlPath.hostname,
      port: urlPath.port,
      method: "POST",
      path: urlPath.path,
      timeout: timeout || 60000,
    };
  }

  public setAuth(username: string, password: string) {
    this.options.auth = `${username}@${password}`;
  }

  public Call<T>(data: Buffer) {
    return new Promise<IMessage<T>>((resolve, reject) => {
      const client = this.httpClient.request(this.options, (res) => {
        res.on("error", reject);

        const chunk: Buffer[] = [];
        res.on("data", (tmp) => {
          chunk.push(tmp);
        });

        res.on("end", () => {
          const returns: IMessage<T> = {
            body: JSON.parse(Buffer.concat(chunk).toString()),
            headers: res.headers,
            statusCode: res.statusCode as number,
          };
          resolve(returns);
        });
      });

      client.setHeader("Content-Length", Buffer.byteLength(data));
      client.write(data);

      client.on("error", reject);
      client.on("timeout", () => reject(new Error("timeout")));
    });
  }

  public Close() {
    this.httpAgent.destroy();
  }
}
