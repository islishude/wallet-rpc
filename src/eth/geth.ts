import { HttpClient } from "../jsonrpc/client";
import { IJsonRpcClient } from "../jsonrpc/ijsonrpc";
import { ReqData } from "../jsonrpc/reqdata";
import {
  BlockParam,
  IEthBlockSimple,
  IEthBlockVerbose,
  IEthCallFuncParam,
  IEthCallStateOverride,
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

  constructor(client?: IJsonRpcClient) {
    this.client = client || new HttpClient({ url: "http://127.0.0.1:8545" });
    this.NODE_VERSION = "geth";
  }

  public getNodeVersion() {
    const reqData = new ReqData("", "web3_clientVersion");
    return this.client.Call<string>(reqData.getData());
  }

  public getNetworkVersion() {
    // "1": Ethereum Mainnet
    // "2": Morden Testnet (deprecated)
    // "3": Ropsten Testnet
    // "4": Rinkeby Testnet
    // "42": Kovan Testnet
    const reqData = new ReqData("", "net_version");
    return this.client.Call<string>(reqData.getData());
  }

  public getPeerCount() {
    const reqData = new ReqData("", "net_peerCount");
    return this.client.Call<string>(reqData.getData());
  }

  public getChainId() {
    const reqData = new ReqData("", "eth_chainId");
    return this.client.Call<string>(reqData.getData());
  }

  public getProtocalVersion() {
    const reqData = new ReqData("", "eth_protocolVersion");
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

  public getBlock<T extends boolean>(height: number, verbose?: T) {
    const num = "0x" + height.toString(16);
    const reqData = new ReqData("", "eth_getBlockByNumber", num, !!verbose);
    type R = T extends true ? IEthBlockVerbose : IEthBlockSimple;
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

  public callContract(
    data: IEthCallFuncParam,
    status: BlockParam = "latest",
    state?: IEthCallStateOverride,
  ) {
    const block = GethClient.Hexify(status);
    const reqData = new ReqData("", "eth_call", data, block, state);
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
