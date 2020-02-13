import { IJsonRpcClient } from "../jsonrpc/ijsonrpc";
import { ReqData } from "../jsonrpc/reqdata";
import { GethClient } from "./geth";
import { BlockParam, IEthTrx, IParityTrxTrace } from "./types";

export class ParityClient extends GethClient {
  constructor(client?: IJsonRpcClient) {
    super(client);
    this.NODE_VERSION = "parity";
  }

  public traceTrx(hash: string) {
    const reqData = new ReqData("", "trace_transaction", hash);
    return this.client.Call<IParityTrxTrace[]>(reqData.getData());
  }

  public traceBlock(height: BlockParam) {
    const param = GethClient.Hexify(height);
    const reqdata = new ReqData("", "trace_block", param);
    return this.client.Call<IParityTrxTrace[]>(reqdata.getData());
  }

  public nextNonce(address: string) {
    const reqData = new ReqData("", "parity_nextNonce", address);
    return this.client.Call<string>(reqData.getData());
  }

  public removeTrx(txid: string) {
    const reqData = new ReqData("", "parity_removeTransaction", txid);
    return this.client.Call<IEthTrx | null>(reqData.getData());
  }
}
