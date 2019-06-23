import test from "ava";
import {
  GethClient,
  IJsonRpcClient,
  IJsonRpcRequst,
  IJsonRpcResponse,
  IMessage,
} from "../..";

class EthMockClient implements IJsonRpcClient {
  public constructor() {
    //
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
          returns.result = "0x00";
          break;
        case "eth_getBlockByNumber":
          returns.result = "0x00";
          break;
        case "eth_getTransactionByHash":
          returns.result = "0x1";
          break;
        case "eth_getTransactionReceipt":
          returns.result = "0x1";
          break;
        case "eth_sendRawTransaction":
          returns.result = "";
          break;
        case "eth_call":
          returns.result = "";
          break;
        case "eth_estimateGas":
          returns.result = "";
          break;
        case "eth_syncing":
          returns.result = "";
          break;
        case "eth_gasPrice":
          returns.result = "";
          break;
        case "txpool_content":
          returns.result = "";
          break;
        case "txpool_inspect":
          returns.result = "";
          break;
        case "txpool_status":
          returns.result = "";
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

  public Close() {
    return;
  }
}

const httpClient = new EthMockClient();
const commonClient = new GethClient(httpClient);
const address = "";
// const token = "";

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
