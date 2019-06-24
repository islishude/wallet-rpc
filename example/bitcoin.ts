import { log } from "console";
import { BitcoinClient, HttpClient, IClientConfig } from "wallet-rpc";

export const DefaultBtcRpcConf: IClientConfig = {
  baseUrl: "http://127.0.0.1:8832",
  keepAlive: false,
  password: "your-rpc-passwword",
  timeout: 10 * 1000,
  username: "your-rpc-username",
};

const client = new HttpClient(DefaultBtcRpcConf);
const BtcClient = new BitcoinClient(client);

// Simple Example
export const ExampleGetRawTrx = async () => {
  const txid =
    "0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098";
  const { body, statusCode, headers } = await BtcClient.getRawTrx(txid, true);
  const { result, error, id } = body;
  if (error !== undefined) {
    // ...
  }
  return result;
};
