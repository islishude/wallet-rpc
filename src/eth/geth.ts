import { IJsonRpcClient } from "../jsonrpc/ijsonrpc";
import ReqData from "../jsonrpc/reqdata";
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

function hex(status: BlockParam): string {
  if (typeof status === "number") {
    return "0x" + status.toString(16);
  }
  return status;
}

export default class EthereumClient {
  public client: IJsonRpcClient;
  public NODE_VERSION: string;

  constructor(client: IJsonRpcClient) {
    this.client = client;
    this.NODE_VERSION = "geth";
  }

  public getBalance(address: string, status: BlockParam = "latest") {
    const reqData = new ReqData("", "eth_getBalance", address, hex(status));
    return this.client.Call<string>(reqData);
  }

  public getTrxCount(address: string, status: BlockParam = "latest") {
    const method = "eth_getTransactionCount";
    const reqData = new ReqData("", method, address, hex(status));
    return this.client.Call<string>(reqData);
  }

  public getBlockNumber() {
    const reqData = new ReqData("", "eth_blockNumber");
    return this.client.Call<string>(reqData);
  }

  public getBlock<T extends boolean>(height: number, verbose: T) {
    const num = "0x" + height.toString(16);
    const reqData = new ReqData("", "eth_getBlockByNumber", num, verbose);
    type R = T extends true ? IEthBlockVerbose : IEthBlock;
    return this.client.Call<R>(reqData);
  }

  public getTrx(hash: string) {
    const reqData = new ReqData("", "eth_getTransactionByHash", hash);
    return this.client.Call<IEthTrx>(reqData);
  }

  public getTrxReceipt(hash: string) {
    const reqData = new ReqData("", "eth_getTransactionReceipt", hash);
    return this.client.Call<IEthTrxReceipt>(reqData);
  }

  public getCode(address: string, status: BlockParam = "latest") {
    const reqData = new ReqData("", "eth_getCode", address, hex(status));
    return this.client.Call<string>(reqData);
  }

  public sendRawTrx(data: string) {
    const reqData = new ReqData("", "eth_sendRawTransaction", data);
    return this.client.Call<string>(reqData);
  }

  public callContract(data: IEthCallFuncParam, status: BlockParam = "latest") {
    const reqData = new ReqData("", "eth_call", data, hex(status));
    return this.client.Call<string>(reqData);
  }

  public estimateGas(data: IEthCallFuncParam, status: BlockParam = "latest") {
    const reqData = new ReqData("", "eth_estimateGas", data, hex(status));
    return this.client.Call<string>(reqData);
  }

  public syncingStatus() {
    const reqData = new ReqData("", "eth_syncing");
    return this.client.Call<ISyncingStatus | boolean>(reqData);
  }

  public gasPrice() {
    const reqData = new ReqData("", "eth_gasPrice");
    return this.client.Call<string>(reqData);
  }

  public txpoolContent() {
    const reqData = new ReqData("", "txpool_content");
    return this.client.Call<IEthTxPoolContent>(reqData);
  }

  public txpoolInspect() {
    const reqData = new ReqData("", "txpool_inspect");
    return this.client.Call<IEthTxPoolInspect>(reqData);
  }

  public txpoolStatus() {
    const reqData = new ReqData("", "txpool_status");
    return this.client.Call<IEthTxPoolStatus>(reqData);
  }
}
