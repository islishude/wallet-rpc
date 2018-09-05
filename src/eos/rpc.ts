import Axios from "axios";
import { HandleError } from "../helper";
import { EOSMethods as mtd } from "./mtd";

export interface IEosChainInfo {
  server_version: string;
  head_block_num: number;
  last_irreversible_block_num: number;
  head_block_id: string;
  head_block_time: string;
  head_block_producer: string;
}

export interface IEosBlockInfo {
  previous: string;
  timestamp: string;
  transaction_mroot: string;
  action_mroot: string;
  block_mroot: string;
  producer: string;
  schedule_version: number;
  new_producers: any;
  producer_signature: string;
  regions: any[];
  input_transactions: [];
  id: string;
  block_num: number;
  ref_block_prefix: number;
}

export interface IEosAccount {
  account_name: string;
  permissions: any[];
}

type EOSVersion = "v1";

interface ISendTxReturn {
  transaction_id: string;
}

export class EOSClient {
  public URL: string;
  /**
   * EOS RPC isn't JSONRPC,so here is diff with bitcoin.
   * @param url schema+ip+url e.g. http://127.0.0.1:8888
   * @param ver API Version Now only supports `v1`
   */
  public constructor(
    url: string = "http://127.0.0.1:8888",
    ver: EOSVersion = "v1"
  ) {
    this.URL = `${url}/${ver}/`;
  }

  /**
   * RPC Call helper func
   * @param method request method from "./mtd.ts"
   * @throws Request or Response error throw
   */
  public async CALL<T>(method: string, body?: object): Promise<T> {
    const url: string = this.URL + method;
    try {
      const result = await Axios.post<T>(url, body, { timeout: 60000 });
      return result.data;
    } catch (e) {
      throw new Error(HandleError(e, this.URL));
    }
  }

  /**
   * Returns an object containing various details about the blockchain.
   */
  public getInfo() {
    return this.CALL<IEosChainInfo>(mtd.chain.info);
  }

  /**
   * Returns an object containing various details about a specific block on the blockchain.
   * @param id Provide a block number or a block id
   */
  public getBlock(id: string) {
    return this.CALL<IEosBlockInfo>(mtd.chain.block, { block_num_or_id: id });
  }

  /**
   * Returns an object containing various details about a specific account on the blockchain.
   */
  public getAccount(account: string) {
    return this.CALL<IEosAccount>(mtd.chain.block, { account_name: account });
  }

  /**
   * get ABI of providing account name
   * @param account
   */
  public getABI(account: string) {
    return this.CALL<any>(mtd.chain.abi, { account_name: account });
  }

  public getCode(account: string) {
    return this.CALL<any>(mtd.chain.code, { account_name: account });
  }

  public getRawCodeAndABI(account: string) {
    return this.CALL<any>(mtd.chain.rawCodeAndABI, { account_name: account });
  }

  /**
   * Get block header state
   * @param id Provide a block number or a block id
   */
  public getBlockHeaderState(id: string) {
    return this.CALL<any>(mtd.chain.blockHeaderState, { block_num_or_id: id });
  }

  public getBalance(code: string, account: string, symbol: string) {
    return this.CALL<any>(mtd.chain.balance, { code, symbol, account });
  }

  /**
   * This method expects a transaction in JSON format and will attempt to apply it to the blockchain.
   * @param signs signatures array of signatures required to authorize transaction
   * @param compression compression used, usually false
   * @param data packed_context_free_data: json of hex
   * @param tx packed_trx: json of hex
   */
  public sendTx(
    signs: string[],
    compression: "true" | "false",
    data: string,
    tx: string
  ) {
    return this.CALL<ISendTxReturn>(mtd.chain.sendTx, {
      signatures: signs,
      compression,
      packed_context_free_data: data,
      packed_tx: tx
    });
  }

  public sendTxes(body: string) {
    return this.CALL<ISendTxReturn>(mtd.chain.sendTxes, { body });
  }

  public getTxInfo(id: number) {
    return this.CALL<any>(mtd.history.tx, { id });
  }

  public getKeyAccount(pubKey: string) {
    return this.CALL<any>(mtd.history.tx, { public_key: pubKey });
  }

  public getControlledAccounts(account: string) {
    return this.CALL<any>(mtd.history.ctrlAccounts, {
      controlling_account: account
    });
  }
}
