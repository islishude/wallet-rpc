import { ok } from "assert";
import { isNullOrUndefined, isString } from "util";
import RPCClient from "../client";
import { IRpcConfig, IRpcResponse } from "../type";
import { EthereumMethods as mtd } from "./mtd";
import {
  IEthBlock,
  IEthBlockSimple,
  IEthBlockVerbose,
  IEthCallFuncParam,
  IEthSentTxStruct,
  IEthStatus,
  IEthSyncing,
  IEthTraceTxReturn,
  IEthTx,
  IEthTxPoolContent,
  IEthTxPoolInspect,
  IEthTxPoolStatus,
  IEthTxReceipt,
  IParityTxTrace,
} from "./type";
import { EthereumUtil } from "./util";

const { ERC20FuncSig, ERC20FuncSigUpper, isAddress, padAddress } = EthereumUtil;

export class EthereumClient extends RPCClient {
  // go-ethereum client RPC settings has no user and password for rpc
  constructor(conf: IRpcConfig = {}) {
    const ip = conf.ip || "http://127.0.0.1";
    const user = conf.user || "";
    const pass = conf.pass || "";
    const port = conf.port || "8545";
    super(user, pass, ip, port, "ethereum");
  }

  /**
   * Returns an object with data about the sync status or false.
   * returns value
   * startingBlock: QUANTITY - The block at which the import started
   * (will only be reset, after the sync reached his head)
   * currentBlock: QUANTITY - The current block, same as eth_blockNumber
   * highestBlock: QUANTITY - The estimated highest block
   */
  public syncProgress() {
    return this.RpcCall<boolean | IEthSyncing>(mtd.info.syncing, []);
  }

  public getBalance(
    address: string,
    status: IEthStatus = "latest",
  ): Promise<IRpcResponse<string>> {
    return this.RpcCall<string>(mtd.address.balance, [address, status]);
  }

  // get block count
  // return hex number
  public getBlockCount() {
    return this.RpcCall<string>(mtd.block.count);
  }

  public getHeight() {
    return this.getBlockCount();
  }

  public getBlockByHash(hash: string, getFullTx: boolean = false) {
    const param: [string, boolean] = [hash, getFullTx];
    return this.RpcCall<IEthBlock>(mtd.block.byHash, param);
  }

  /**
   * Get information about a block by block number.
   * @param symbol QUANTITY|TAG - integer of a block number, or the string "earliest", "latest" or "pending"
   * @see https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_getblockbynumber
   */
  public getBlock(symbol: string) {
    const param: [string, boolean] = [symbol, false];
    return this.RpcCall<IEthBlockSimple>(mtd.block.byHeight, param);
  }

  public getBlockVerbose(symbol: string) {
    const param: [string, boolean] = [symbol, true];
    return this.RpcCall<IEthBlockVerbose>(mtd.block.byHeight, param);
  }

  public getTxByHash(hash: string) {
    return this.RpcCall<IEthTx | null>(mtd.tx.byHash, [hash]);
  }

  /**
   * Return raw transaction by hash
   * There is an "undocumented" method eth_getRawTransactionByHash
   * @param hash
   */
  public getRawTxByHash(hash: string) {
    return this.RpcCall<string>(mtd.tx.rawByHash, [hash]);
  }

  /**
   * Returns the receipt of a transaction by transaction hash.
   * Note That the receipt is not available for pending transactions.
   * @param hash tx hash
   * @see https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_gettransactionreceipt
   * @see https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_getfilterchanges
   */
  public getTxReceipt(hash: string) {
    return this.RpcCall<IEthTxReceipt | null>(mtd.tx.receipt, [hash]);
  }

  public sendRawTx(raw: string) {
    return this.RpcCall<string>(mtd.tx.sendRaw, [raw]);
  }

  /**
   * Creates new message call transaction or a contract creation, if the data field contains code.
   * @see https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI
   * @see https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_sendtransaction
   */
  public sendTx(tx: IEthSentTxStruct) {
    return this.RpcCall<string>(mtd.tx.send, [tx]);
  }

  /**
   * Returns the number of transactions sent from an address.
   * alias for getTxCount
   * Geth(<=1.8.12) now doesn't supports pending nonce.
   * please use `parity` with `getAddrNextNonce` in the flow func
   */
  public getAddrNonce(address: string, status: IEthStatus = "latest") {
    const param: string[] = [address, status];
    return this.RpcCall<string>(mtd.address.nonce, param);
  }

  /**
   * Returns next available nonce for transaction from given account.
   * Includes pending block and transaction queue.
   * !! Only for parity node
   * @param address
   * @see https://wiki.parity.io/JSONRPC-parity-module#parity_nextnonce
   */
  public getAddrNextNonce(address: string) {
    return this.RpcCall<string>(mtd.address.parity.pendingNonce, [address]);
  }

  /**
   * Returns the current price per gas in wei.
   * @see https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_gasprice
   */
  public getCurrentGasPrice() {
    return this.RpcCall<string>(mtd.gas.price, []);
  }

  /**
   * Executes a new message call immediately without creating a transaction on the block chain.
   * @see https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_call
   */
  public callFunc(param: IEthCallFuncParam, status: IEthStatus = "latest") {
    return this.RpcCall<string>(mtd.tx.call, [param, status]);
  }

  /**
   * Returns code at a given address.
   * @param address DATA, 20 Bytes - address
   * @param status integer block number, or the string "latest", "earliest" or "pending"
   * @returns the code from the given address
   */
  public getCode(address: string, status: IEthStatus) {
    return this.RpcCall<string>(mtd.address.code, [address, status]);
  }

  /**
   * Detect the address given is contract address or not
   * but if contract self destructor would be return false
   * @param address string
   * @param status string
   * @returns boolean
   */
  public async isContract(address: string): Promise<boolean> {
    const { result } = await this.getCode(address, "latest");

    if (result !== "0x") {
      return true;
    }

    return false;
  }

  /**
   * Generates and returns an estimate of how much gas is necessary to allow the transaction to complete.
   * The transaction will not be added to the blockchain.
   * Note that the estimate may be significantly more than the amount of gas actually used by the transaction,
   * for a variety of reasons including EVM mechanics and node performance.
   */
  public getEstimateGas(param: IEthCallFuncParam) {
    return this.RpcCall<string>(mtd.gas.estimate, [param]);
  }

  /**
   * Sign Message.
   * NOT Supports address which doesn't in you eth-rpc
   * @param address the address to sign with must be unlocked.
   * @param data N Bytes - message to sign
   */
  public signMessage(address: string, data: Buffer) {
    ok(isAddress(address), "Not a valid Ethereum address");
    return this.RpcCall<string>(mtd.tool.sign, [address, data.toString("hex")]);
  }

  /**
   * debug trace transaction
   * you should start geth with `--rpcapi="web3,trace"
   * @see https://github.com/ethereum/go-ethereum/wiki/Management-APIs#debug_tracetransaction
   */
  public traceTx(
    txid: string,
    opt?: {
      disableStorage?: boolean;
      disableMemory?: boolean;
      disableStack?: boolean;
      trace?: string;
      timeout?: string;
    },
  ) {
    return this.RpcCall<IEthTraceTxReturn>(mtd.trace.trx, [txid, opt]);
  }

  public traceTxByParity(txid: string) {
    return this.RpcCall<IParityTxTrace[] | null>(mtd.trace.trx, [txid]);
  }

  public txpoolContent() {
    return this.RpcCall<IEthTxPoolContent>(mtd.txpool.content);
  }

  public txpoolInspect() {
    return this.RpcCall<IEthTxPoolInspect>(mtd.txpool.inspect);
  }

  public txpoolStatus() {
    return this.RpcCall<IEthTxPoolStatus>(mtd.txpool.status);
  }

  public ParityPendingTrx() {
    return this.RpcCall<IEthTx[]>(mtd.tx.parity.pending);
  }

  public ParityRemoveTrx(hash: string) {
    return this.RpcCall<IEthTx | null>(mtd.tx.parity.remove, [hash]);
  }

  public async ERC20Balance(
    token: string,
    address: string,
    isPending: boolean = true,
  ) {
    const status = isPending ? "pending" : "latest";
    const param: IEthCallFuncParam = {
      data: ERC20FuncSig.balanceOf + padAddress(address),
      to: token,
    };
    const { result, error } = await this.callFunc(param, status);

    if (!isNullOrUndefined(error)) {
      return "0";
    }

    return result;
  }

  public async ERC20Decimals(token: string): Promise<undefined | number> {
    const param: IEthCallFuncParam = {
      data: ERC20FuncSig.decimals,
      to: token,
    };

    const PARAM: IEthCallFuncParam = {
      data: ERC20FuncSigUpper.DECIMALS,
      to: token,
    };
    const [{ result: decimals }, { result: DECIMALS }] = await Promise.all([
      this.callFunc(param),
      this.callFunc(PARAM),
    ]);
    if (decimals === "0x" && DECIMALS === "0x") {
      return;
    }
    // For parity fix
    // If a contract ISN'T a ERC20 will be throw
    if (!decimals && !DECIMALS) {
      return;
    }
    const tmp = decimals === "0x" ? DECIMALS : decimals;
    if (!tmp) {
      return;
    }
    return Number.parseInt(tmp, 16);
  }

  public async ERC20TotalSupply(token: string): Promise<string | undefined> {
    const param: IEthCallFuncParam = {
      data: ERC20FuncSig.totalSupply,
      to: token,
    };
    const { result: totalSupply } = await this.callFunc(param);
    if (totalSupply === "0x" || isNullOrUndefined(totalSupply)) {
      return;
    }
    return totalSupply;
  }

  public async ERC20Name(token: string): Promise<undefined | string> {
    const param: IEthCallFuncParam = {
      data: ERC20FuncSig.name,
      to: token,
    };
    const PARAM: IEthCallFuncParam = {
      data: ERC20FuncSigUpper.NAME,
      to: token,
    };
    const [{ result: name }, { result: NAME }] = await Promise.all([
      this.callFunc(param),
      this.callFunc(PARAM),
    ]);

    if (!isString(name) && !isString(NAME)) {
      return;
    }

    if (name === "0x" && NAME === "0x") {
      return;
    }

    const tmp = name === "0x" ? NAME : name;

    if (!isString(tmp)) {
      return;
    }

    return EthereumUtil.decodeABIString(tmp);
  }

  public async ERC20Symbol(token: string): Promise<undefined | string> {
    const param: IEthCallFuncParam = {
      data: ERC20FuncSig.symbol,
      to: token,
    };
    const PARAM: IEthCallFuncParam = {
      data: ERC20FuncSigUpper.SYMBOL,
      to: token,
    };
    const [{ result: symbol }, { result: SYMBOL }] = await Promise.all([
      this.callFunc(param),
      this.callFunc(PARAM),
    ]);

    if (!isString(symbol) && !isString(SYMBOL)) {
      return;
    }

    if (symbol === "0x" && SYMBOL === "0x") {
      return;
    }

    const tmp = symbol === "0x" ? SYMBOL : symbol;

    if (!isString(tmp)) {
      return;
    }
    return EthereumUtil.decodeABIString(tmp);
  }

  public async ERC20TokenInfo(token: string) {
    const [decimals, name, symbol, totalSupply] = await Promise.all([
      this.ERC20Decimals(token),
      this.ERC20Name(token),
      this.ERC20Symbol(token),
      this.ERC20TotalSupply(token),
    ]);

    return {
      decimals,
      name,
      symbol,
      totalSupply,
    };
  }
}
