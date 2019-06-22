import { IJsonRpcClient } from "../jsonrpc/ijsonrpc";
import ReqData from "../jsonrpc/reqdata";
import Geth from "./geth";
import { IEthTrx, IParityTrxTrace } from "./types";

export default class Parity extends Geth {
  constructor(client: IJsonRpcClient) {
    super(client);
    this.NODE_VERSION = "parity";
  }

  public traceTrx(hash: string) {
    const reqData = new ReqData("", "trace_transaction", hash);
    return this.client.Call<IParityTrxTrace>(reqData);
  }

  public nextNonce(address: string) {
    const reqData = new ReqData("", "parity_nextNonce", address);
    return this.client.Call<string>(reqData);
  }

  public removeTrx(txid: string) {
    const reqData = new ReqData("", "parity_removeTransaction", txid);
    return this.client.Call<IEthTrx | null>(reqData);
  }
}
