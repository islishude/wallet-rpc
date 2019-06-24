import http = require("http");
import https = require("https");
import { version as PkgVer } from "../jsonrpc/version";

export interface IMessage<T> {
  statusCode: number;
  headers: http.IncomingHttpHeaders;
  body: T;
}
export interface IHTTPClient {
  Get<T>(url: string): Promise<IMessage<T>>;
  Post<T>(url: string, body: object): Promise<IMessage<T>>;
}

export class EOSClient implements IHTTPClient {
  public baseUrl: string;
  private httpAgent: http.Agent | https.Agent;
  private httpModule: typeof http | typeof https;

  private headers = {
    "Accept": "application/json",
    "Accept-Encoding": "identity",
    "Agent": `wallet-rpc/${PkgVer}`,
    "Content-Type": "application/json",
  };

  public constructor(
    baseUrl: string,
    keepAlive: boolean = false,
    timeout: number = 10 * 1000,
  ) {
    this.httpModule = /^https:.+$/g.test(baseUrl) ? https : http;
    this.httpAgent = new this.httpModule.Agent({ keepAlive, timeout });
    this.baseUrl = baseUrl;
  }

  public Get<T>(url: string): Promise<IMessage<T>> {
    return new Promise<IMessage<T>>((resolve, reject) => {
      http.get(
        this.baseUrl + url,
        { agent: this.httpAgent, headers: this.headers },
        (res) => {
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
        },
      );
    });
  }

  public Post<T>(url: string, data: object): Promise<IMessage<T>> {
    return new Promise<IMessage<T>>((resolve, reject) => {
      const client = this.httpModule.request(
        this.baseUrl + url,
        {
          agent: this.httpAgent,
          headers: this.headers,
        },
        (res) => {
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
        },
      );

      const reqBuffer = Buffer.from(JSON.stringify(data));
      client.setHeader("Content-Length", Buffer.byteLength(reqBuffer));
      client.write(data);

      client.on("timeout", () => reject(new Error("timeout")));
    });
  }
}
