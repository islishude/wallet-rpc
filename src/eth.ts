import { Ethereum } from "../defined/eth";
import { NumberResult, StringResult } from "../defined/rpc";
import Client from "./client";
import { EthMtd, Mtd } from "./methods";

export default class EthereumClient extends Client {
  constructor(user: string, pass: string, ip: string, port: number = 30303) {
    super(user, pass, ip, port);
  }

  public getBlockCount() {
    return this.rpc(EthMtd.getBlockNumber) as Promise<StringResult>;
  }

  public getBlockByHash(hash: string, isFullTransaction: boolean = true) {
    const param: [string, boolean] = [hash, isFullTransaction];
    return this.rpc(EthMtd.getBlockByHash, param) as Promise<Ethereum.IBlock>;
  }

  public getUncleByBlockHashAndIndex(hash: string, index: string) {
    const param: string[] = [hash, index];
    return this.rpc(EthMtd.getUncleByBlockHashAndIndex, param) as Promise<
      Ethereum.IBlock
    >;
  }

  public getUncleByBlockNumberAndIndex(height: string, index: string) {
    const param: string[] = [height, index];
    return this.rpc(EthMtd.getUncleByBlockNumberAndIndex, param) as Promise<
      Ethereum.IBlock
    >;
  }

  public sendRawTx(raw: string) {
    return this.rpc(EthMtd.sendRawTransaction, [raw]) as Promise<StringResult>;
  }

  public sendTransaction(tx: Ethereum.ITxStruct) {
    return this.rpc(EthMtd.sendTransaction, [tx]) as Promise<StringResult>;
  }

  // get address nonce
  public getTransactionCount(
    address: string,
    status: Ethereum.Status = "latest"
  ) {
    const param: string[] = [address, status];
    return this.rpc(EthMtd.getTransactionCount, param) as Promise<StringResult>;
  }
}
