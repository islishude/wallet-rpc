import { log } from "console";
import {
  BitcoinClient,
  BitcoinMethods,
  IBtcTxInfo,
  IRpcConfig,
  IRpcRequest
} from "wallet-rpc";

export const DefaultBtcRpcConf: IRpcConfig = {
  ip: "http://127.0.0.1",
  pass: "",
  port: "8332",
  user: ""
};

const BtcClient = new BitcoinClient(DefaultBtcRpcConf);

// Simple Example
export const example0 = async () => {
  const txid =
    "0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098";
  const { error, result, id } = await BtcClient.getTxInfo(txid);
  if (error !== undefined) {
    // ...
  }
  log(id);
  return result;
};

// BulkCall example
export const example1 = async () => {
  const txidList: string[] = [
    "0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098",
    "ce3ab453f96020a32ca382d07967231fa463cf1f365ce4bdc52764faf20371bf"
  ];

  const reqData: IRpcRequest[] = txidList.map(txid => {
    const tmp: IRpcRequest = {
      id: txid,
      jsonrpc: "2.0",
      method: BitcoinMethods.tx.detail,
      params: [txid]
    };
    return tmp;
  });

  const res = await BtcClient.BulkRpcExec<IBtcTxInfo>(reqData);

  for (const { result, error } of res) {
    if (error !== undefined) {
      // ...
    }
    log("%O", result);
  }
};

// Another BulkCall example(NOT RECOMMEND)
export const example3 = async () => {
  const txidList: string[] = [
    "0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098",
    "ce3ab453f96020a32ca382d07967231fa463cf1f365ce4bdc52764faf20371bf"
  ];

  for (const txid of txidList) {
    const tmp: IRpcRequest = {
      id: txid,
      jsonrpc: "2.0",
      method: BitcoinMethods.tx.detail,
      params: [txid]
    };
    BtcClient.BulkAdd(tmp);
  }

  const res = await BtcClient.BulkRpcCall<IBtcTxInfo>();

  for (const { result, error } of res) {
    if (error !== undefined) {
      // ...
    }
    log("%O", result);
  }
};
