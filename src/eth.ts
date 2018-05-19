import { Ethereum } from "../defined/eth";
import { RPCResponse } from "../defined/rpc";
import Client from "./client";
import { EthMtd } from "./methods";

export default class EthereumClient extends Client {
  // go-ethereum client RPC settings has no user and password for rpc
  constructor(
    ip: string,
    port: number = 30303,
    user: string = "",
    pass: string = ""
  ) {
    super(user, pass, ip, port);
  }

  // get block count
  // return hex number
  public getBlockCount() {
    return this.RpcCall(EthMtd.getBlockNumber);
  }

  public getBlockByHash(hash: string, getFullTx: boolean = false) {
    const param: [string, boolean] = [hash, getFullTx];
    const method = EthMtd.getBlockByHash;
    return this.RpcCall<Ethereum.IBlock>(method, param);
  }

  /**
   * Get information about a block by block number.
   * @param symbol QUANTITY|TAG - integer of a block number, or the string "earliest", "latest" or "pending", as in the default block parameter.
   * @param getFullTx  If true it returns the full transaction objects, if false only the hashes of the transactions.
   * @see https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_getblockbynumber
   */
  public getBlockByNumber(symbol: string, getFullTx: boolean = false) {
    const param: [string, boolean] = [symbol, getFullTx];
    const method = EthMtd.getBlockByNumber;
    return this.RpcCall<Ethereum.IBlock>(method, param);
  }

  public getUncleByBlockHashAndIndex(hash: string, index: string) {
    const param: string[] = [hash, index];
    const method: string = EthMtd.getUncleByBlockHashAndIndex;
    return this.RpcCall<Ethereum.IBlock>(method, param);
  }

  public getUncleByBlockNumberAndIndex(height: string, index: string) {
    const param: string[] = [height, index];
    const method: string = EthMtd.getUncleByBlockNumberAndIndex;
    return this.RpcCall<Ethereum.IBlock>(method, param);
  }

  public getTxByHash(hash: string) {
    return this.RpcCall<Ethereum.ITransaction>(EthMtd.getTxByHash, [hash]);
  }

  public sendRawTx(raw: string) {
    return this.RpcCall(EthMtd.sendRawTx, [raw]);
  }

  /**
   * Creates new message call transaction or a contract creation, if the data field contains code.
   * from: DATA, 20 Bytes - The address the transaction is send from.
   * to: DATA, 20 Bytes - (optional when creating new contract) The address the transaction is directed to.
   * gas: QUANTITY - (optional, default: 90000) Integer of the gas provided for the transaction execution. It will return unused gas.
   * gasPrice: QUANTITY - (optional, default: To-Be-Determined) Integer of the gasPrice used for each paid gas
   * value: QUANTITY - (optional) Integer of the value sent with this transaction
   * data: DATA - The compiled code of a contract OR the hash of the invoked method signature and encoded parameters. For details see Ethereum Contract ABI
   * nonce: QUANTITY - (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.
   * @see https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI
   * @see https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_sendtransaction
   */
  public sendTx(tx: Ethereum.ISentTxStruct) {
    return this.RpcCall(EthMtd.sendTx, [tx]);
  }

  /**
   * Returns the number of transactions sent from an address.
   * in other word it's `nonce`
   */
  public getTxCount(address: string, status: Ethereum.Status = "latest") {
    const param: string[] = [address, status];
    const method: string = EthMtd.getTxCount;
    return this.RpcCall(method, param);
  }

  /**
   * Returns the current price per gas in wei.
   * @see https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_gasprice
   */
  public getCurrentGasPrice() {
    const method: string = EthMtd.getGasPrice;
    return this.RpcCall(method, []);
  }

  /**
   * Executes a new message call immediately without creating a transaction on the block chain.
   * @see https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_call
   */
  public callFunc(
    param: Ethereum.ICallFuncParam,
    status: Ethereum.Status = "latest"
  ) {
    return this.RpcCall(EthMtd.call, [param, status]);
  }

  /**
   * Returns code at a given address.
   * @param address DATA, 20 Bytes - address
   * @param status integer block number, or the string "latest", "earliest" or "pending"
   * @returns the code from the given address
   */
  public getCode(address: string, status: string) {
    return this.RpcCall(EthMtd.getCode);
  }

  /**
   * Generates and returns an estimate of how much gas is necessary to allow the transaction to complete.
   * The transaction will not be added to the blockchain.
   * Note that the estimate may be significantly more than the amount of gas actually used by the transaction,
   * for a variety of reasons including EVM mechanics and node performance.
   */

  public getEstimateGas(
    param: Ethereum.ICallFuncParam,
    status: Ethereum.Status = "latest"
  ) {
    return this.RpcCall(EthMtd.getEstimateGas, [param, status]);
  }
}
