import test from "ava";
import {
  GethClient,
  IJsonRpcClient,
  IJsonRpcRequst,
  IJsonRpcResponse,
  IMessage,
} from "../..";
import { EthBlockSimple, EthTrx, EthTrxReceipt } from "./types";

class EthMockClient implements IJsonRpcClient {
  public NodeType: string;
  public constructor() {
    this.NodeType = "testing mock client";
  }

  public Call<T>(data: Buffer): Promise<IMessage<T>> {
    return new Promise((resolve, _) => {
      const json: IJsonRpcRequst = JSON.parse(data.toString());

      const returns: IJsonRpcResponse<any> = {
        id: "",
        jsonrpc: "2.0",
        result: "",
      };
      switch (json.method) {
        case "eth_getBalance":
          returns.result = "0x00";
          break;
        case "eth_getTransactionCount":
          returns.result = "0x00";
          break;
        case "eth_blockNumber":
          returns.result = "0x01";
          break;
        case "eth_getBlockByNumber":
          returns.result = EthBlockSimple;
          break;
        case "eth_getTransactionByHash":
          returns.result = EthTrx;
          break;
        case "eth_getTransactionReceipt":
          returns.result = EthTrxReceipt;
          break;
        case "eth_sendRawTransaction":
          returns.result = "0x00";
          break;
        case "eth_call":
          returns.result = "0x5208";
          break;
        case "eth_estimateGas":
          returns.result = "0x20";
          break;
        case "eth_syncing":
          returns.result = false;
          break;
        case "eth_gasPrice":
          returns.result = "0x20";
          break;
        default:
          returns.error = {
            code: 100,
            message: "unsupport method",
          };
      }
      resolve({
        body: returns,
        headers: {},
        statusCode: 200,
      });
    });
  }

  public setAuth(username: string, password: string) {
    console.log(username, password);
  }

  public setUrl(url: string) {
    console.log(url);
  }

  public Close() {
    return;
  }
}

const httpClient = new EthMockClient();
const commonClient = new GethClient(httpClient);
const address = "";

test("eth get get balance", async (t) => {
  const lastest = await commonClient.getBalance(address);
  const {
    body: { result },
    statusCode,
  } = lastest;
  t.assert(typeof statusCode === "number");
  t.assert(typeof result === "string");

  // type tests
  commonClient.getBalance("0x0", "pending");
  commonClient.getBalance("0x0", 100);
});

test("eth get trx count", async (t) => {
  const lastest = await commonClient.getTrxCount("0x0", "latest");
  const {
    body: { result },
    statusCode,
  } = lastest;
  t.assert(typeof statusCode === "number");
  t.assert(typeof result === "string");
  commonClient.getTrxCount("0x0", "pending");
  commonClient.getTrxCount("0x0", "pending");
});

test("test hexify", (t) => {
  t.deepEqual(GethClient.Hexify("latest"), "latest");
  t.deepEqual(GethClient.Hexify("pending"), "pending");
  t.deepEqual(GethClient.Hexify("earliest"), "earliest");
  t.deepEqual(GethClient.Hexify(10), "0xa");
});
