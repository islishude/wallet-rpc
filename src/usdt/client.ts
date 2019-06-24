import { BitcoinClient } from "../btc/client";
import { IJsonRpcClient } from "../jsonrpc/ijsonrpc";
import { ReqData } from "../jsonrpc/reqdata";
import {
  IOmniClientInfo,
  IOmniPropertyBalance,
  IOmniPropertyInfo,
  IOmniTxInfo,
} from "./type";

export class USDTClient extends BitcoinClient {
  constructor(client: IJsonRpcClient) {
    super(client);
  }

  public getClientInfo() {
    const reqData = new ReqData("", "omni_getinfo");
    return this.client.Call<IOmniClientInfo>(reqData.getData());
  }

  public getBalance(address: string, propId: number = 31) {
    const reqData = new ReqData("", "omni_getbalance", address, propId);
    return this.client.Call<IOmniPropertyBalance>(reqData.getData());
  }

  public getAllPropBalance(address: string) {
    const reqData = new ReqData("", "omni_getallbalancesforaddress", address);
    return this.client.Call<IOmniPropertyBalance[]>(reqData.getData());
  }

  public getPropInfo(propId: number = 31) {
    const reqData = new ReqData("", "omni_getproperty", propId);
    return this.client.Call<IOmniPropertyInfo>(reqData.getData());
  }

  public getTrxInfo(txid: string) {
    const reqData = new ReqData("", "omni_gettransaction", txid);
    return this.client.Call<IOmniTxInfo>(reqData.getData());
  }

  public listBlockTrxes(height: number) {
    const reqData = new ReqData("", "omni_listblocktransactions", height);
    return this.client.Call<string[]>(reqData.getData());
  }

  public listPendingTrxes(address?: string) {
    const reqData = new ReqData("", "omni_listpendingtransactions", address);
    return this.client.Call<IOmniTxInfo[]>(reqData.getData());
  }

  public sendRawTx(rawTrx: string) {
    const reqData = new ReqData("", "sendrawtransaction", rawTrx);
    return this.client.Call<string>(reqData.getData());
  }
}
