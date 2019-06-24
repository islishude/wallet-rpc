import { IJsonRpcClient } from "../jsonrpc/ijsonrpc";
import { ReqData } from "../jsonrpc/reqdata";
import {
  BlockParam,
  IEthBlock,
  IEthBlockVerbose,
  IEthCallFuncParam,
  IEthTrx,
  IEthTrxReceipt,
  IEthTxPoolContent,
  IEthTxPoolInspect,
  IEthTxPoolStatus,
  ISyncingStatus,
} from "./types";

export class GethClient {
  public static Hexify(status: BlockParam): string {
    if (typeof status === "number") {
      return "0x" + status.toString(16);
    }
    return status;
  }
  public client: IJsonRpcClient;
  public NODE_VERSION: string;

  constructor(client: IJsonRpcClient) {
    this.client = client;
    this.NODE_VERSION = "geth";
  }

  public getChainId() {
    const reqData = new ReqData("", "eth_chainId");
    return this.client.Call<string>(reqData.getData());
  }

  public getBalance(address: string, status: BlockParam = "latest") {
    const block = GethClient.Hexify(status);
    const reqData = new ReqData("", "eth_getBalance", address, block);
    return this.client.Call<string>(reqData.getData());
  }

  public getTrxCount(address: string, status: BlockParam = "latest") {
    const method = "eth_getTransactionCount";
    const block = GethClient.Hexify(status);
    const reqData = new ReqData("", method, address, block);
    return this.client.Call<string>(reqData.getData());
  }

  public getBlockNumber() {
    const reqData = new ReqData("", "eth_blockNumber");
    return this.client.Call<string>(reqData.getData());
  }

  public getBlock<T extends boolean>(height: number, verbose: T) {
    const num = "0x" + height.toString(16);
    const reqData = new ReqData("", "eth_getBlockByNumber", num, verbose);
    type R = T extends true ? IEthBlockVerbose : IEthBlock;
    return this.client.Call<R>(reqData.getData());
  }

  public getTrx(hash: string) {
    const reqData = new ReqData("", "eth_getTransactionByHash", hash);
    return this.client.Call<IEthTrx>(reqData.getData());
  }

  public getTrxReceipt(hash: string) {
    const reqData = new ReqData("", "eth_getTransactionReceipt", hash);
    return this.client.Call<IEthTrxReceipt>(reqData.getData());
  }

  public getCode(address: string, status: BlockParam = "latest") {
    const block = GethClient.Hexify(status);
    const reqData = new ReqData("", "eth_getCode", address, block);
    return this.client.Call<string>(reqData.getData());
  }

  public sendRawTrx(data: string) {
    const reqData = new ReqData("", "eth_sendRawTransaction", data);
    return this.client.Call<string>(reqData.getData());
  }

  public callContract(data: IEthCallFuncParam, status: BlockParam = "latest") {
    const block = GethClient.Hexify(status);
    const reqData = new ReqData("", "eth_call", data, block);
    return this.client.Call<string>(reqData.getData());
  }

  public estimateGas(data: IEthCallFuncParam, status: BlockParam = "latest") {
    const block = GethClient.Hexify(status);
    const reqData = new ReqData("", "eth_estimateGas", data, block);
    return this.client.Call<string>(reqData.getData());
  }

  public syncingStatus() {
    const reqData = new ReqData("", "eth_syncing");
    return this.client.Call<ISyncingStatus | boolean>(reqData.getData());
  }

  public gasPrice() {
    const reqData = new ReqData("", "eth_gasPrice");
    return this.client.Call<string>(reqData.getData());
  }

  public txpoolContent() {
    const reqData = new ReqData("", "txpool_content");
    return this.client.Call<IEthTxPoolContent>(reqData.getData());
  }

  public txpoolInspect() {
    const reqData = new ReqData("", "txpool_inspect");
    return this.client.Call<IEthTxPoolInspect>(reqData.getData());
  }

  public txpoolStatus() {
    const reqData = new ReqData("", "txpool_status");
    return this.client.Call<IEthTxPoolStatus>(reqData.getData());
  }
}
