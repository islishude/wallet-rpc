import { log } from "console";
import { isNull } from "util";
import { OmniLayerClient } from "wallet-rpc";
import { DefaultBtcRpcConf } from "./bitcoin";

const OmniClient = new OmniLayerClient(DefaultBtcRpcConf);

export const getTxInfo = async () => {
  const txid =
    "0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098";

  const txInfo = await OmniClient.getOmniTxInfo(txid);

  if (isNull(txInfo)) {
    throw new Error("Tx not found");
  }

  return txInfo;
};

export const getBalance = async () => {
  const address = "";
  const propertyId = 31; // USDT

  const info = await OmniClient.getPropertyBalance(address, propertyId);

  if (isNull(info)) {
    throw new Error("Address not found");
  }

  return info.result.balance;
};
