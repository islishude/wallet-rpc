import { HttpClient, IClientConfig, USDTClient } from "wallet-rpc";

export const DefaultBtcRpcConf: IClientConfig = {
  baseUrl: "http://127.0.0.1:8832",
  keepAlive: false,
  password: "your-rpc-passwword",
  timeout: 10 * 1000,
  username: "your-rpc-username",
};

const client = new HttpClient(DefaultBtcRpcConf);
const usdt = new USDTClient(client);

export const getTxInfo = async () => {
  const txid =
    "0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098";

  await usdt.getTrxInfo(txid);
};

export const getBalance = async () => {
  const address = "";
  const propertyId = 31; // USDT

  await usdt.getBalance(address, propertyId);
  await usdt.sendRawTx("");
};
