import http = require("http");
import https = require("https");
import urllib = require("url");
import { IJsonRpcClient } from "./ijsonrpc";
import { IClientConfig, IMessage } from "./imsg";

export class HttpClient implements IJsonRpcClient {
  // @ts-ignore
  public url: string;
  public options: http.RequestOptions;
  public httpAgent: http.Agent | https.Agent;
  public httpModule: typeof http | typeof https;

  constructor(config: IClientConfig) {
    const { url, username, password, keepAlive, timeout } = config;
    this.httpModule = /^https:.+$/g.test(url) ? https : http;
    this.httpAgent = new this.httpModule.Agent({
      keepAlive: keepAlive || false,
    });

    this.options = {
      agent: this.httpAgent,
      auth:
        config.username || config.password
          ? `${username || ""}@${password || ""}`
          : undefined,
      headers: {
        "Accept": "application/json",
        "Accept-Encoding": "identity",
        "Agent": "islishude/walletrpc",
        "Content-Type": "application/json",
      },
      method: "POST",
      timeout: timeout || 60000,
    };
    this.setUrl(url);
  }

  public setAuth(username: string, password: string) {
    if (username === "" && password === "") {
      return;
    }
    this.options.auth = `${username}@${password}`;
  }

  public setUrl(url: string) {
    const { host, hostname, port } = urllib.parse(url);
    this.options.host = host;
    this.options.hostname = hostname;
    if (port) {
      this.options.port = Number.parseInt(port, 10);
    }
    this.httpModule = /^https:.+$/g.test(url) ? https : http;
    this.url = url;
  }

  public Call<T>(data: Buffer) {
    return new Promise<IMessage<T>>((resolve, reject) => {
      const client = this.httpModule.request(this.options, (res) => {
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
