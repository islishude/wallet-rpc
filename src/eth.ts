import { Ethereum } from "../defined/eth";
import { NumberResult, StringResult } from "../defined/rpc";
import Client from "./client";
import { EthMtd } from "./methods";

export default class EthereumClient extends Client {
  constructor(user: string, pass: string, ip: string, port: number = 30303) {
    super(user, pass, ip, port);
  }

  public getBlockCount() {
    return this.RpcCall(EthMtd.getBlockNumber) as Promise<StringResult>;
  }

  public getBlockByHash(hash: string, isFullTransaction: boolean = true) {
    const param: [string, boolean] = [hash, isFullTransaction];
    const method = EthMtd.getBlockByHash;
    return this.RpcCall(method, param) as Promise<Ethereum.IBlock>;
  }

  public getUncleByBlockHashAndIndex(hash: string, index: string) {
    const param: string[] = [hash, index];
    const method: string = EthMtd.getUncleByBlockHashAndIndex;
    return this.RpcCall(method, param) as Promise<Ethereum.IBlock>;
  }

  public getUncleByBlockNumberAndIndex(height: string, index: string) {
    const param: string[] = [height, index];
    const method: string = EthMtd.getUncleByBlockNumberAndIndex;
    return this.RpcCall(method, param) as Promise<Ethereum.IBlock>;
  }

  public sendRawTx(raw: string) {
    const method: string = EthMtd.sendRawTransaction;
    return this.RpcCall(method, [raw]) as Promise<StringResult>;
  }

  public sendTransaction(tx: Ethereum.ITxStruct) {
    return this.RpcCall(EthMtd.sendTransaction, [tx]) as Promise<StringResult>;
  }

  // get address nonce
  public getTransactionCount(
    address: string,
    status: Ethereum.Status = "latest"
  ) {
    const param: string[] = [address, status];
    const method: string = EthMtd.getTransactionCount;
    return this.RpcCall(method, param) as Promise<StringResult>;
  }
}
