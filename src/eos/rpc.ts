import Axios from "axios";
import { log } from "console";
import { ErrorResolver } from "../helper";
import {
  EOSMethods as methods,
  EOSPlugins as plugins,
  IEosAbi,
  IEosAccount,
  IEosBlockInfo,
  IEosChainInfo,
  IEosTrx
} from "./mtd";

type EOSVersion = "v1";

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
    log(
      "\x1b[41m\x1b[37mEOS Client of wallet-prc is still under active development,use of the feature is not recommended in production environments\x1b[0m"
    );
    this.URL = `${url}/${ver}/`;
  }

  public getCallURL(module: string, api: string): string {
    return `${this.URL}/${module}/${api}`;
  }

  /**
   * RPC Call helper func
   * @param method request method from "./mtd.ts"
   * @throws Request or Response error throw
   */
  public async CALL<T>(
    module: string,
    method: string,
    body?: object
  ): Promise<T> {
    const url: string = this.getCallURL(module, method);
    try {
      const result = await Axios.post<T>(url, body, { timeout: 60000 });
      return result.data;
    } catch (e) {
      throw new Error(ErrorResolver(e, this.URL));
    }
  }

  /**
   * Returns an object containing various details about the blockchain.
   */
  public getInfo() {
    return this.CALL<IEosChainInfo>(plugins.chain, methods.chain.info);
  }

  /**
   * Returns an object containing various details about a specific block on the blockchain.
   * @param id Provide a block number or a block id
   */
  public getBlock(id: string | number) {
    return this.CALL<IEosBlockInfo>(plugins.chain, methods.chain.block, {
      block_num_or_id: id
    });
  }

  /**
   * Returns an object containing various details about a specific account on the blockchain.
   */
  public getAccountInfo(account: string) {
    return this.CALL<IEosAccount>(plugins.chain, methods.chain.block, {
      account_name: account
    });
  }

  public getAccountsByPubKey(pubKey: string) {
    return this.CALL<{ accounts_name: string[] }>(
      plugins.history,
      methods.history.tx,
      {
        public_key: pubKey
      }
    );
  }

  public getCurrencyStats(code: string, symbol: string) {
    return this.CALL<{ supply: string; max_supply: string; issuer: string }>(
      plugins.chain,
      methods.chain.stats,
      {
        code,
        symbol
      }
    );
  }

  /**
   * get ABI of providing account name
   * @param account
   */
  public getABI(account: string) {
    return this.CALL<{
      account_name: string;
      abi: IEosAbi;
    }>(plugins.chain, methods.chain.abi, {
      account_name: account
    });
  }

  public getCode(account: string) {
    return this.CALL<{
      account_name: string;
      code_hash: string;
      wast: string;
      wasm: string;
      abi: IEosAbi;
    }>(plugins.chain, methods.chain.code, {
      account_name: account
    });
  }

  public getRawCodeAndABI(account: string) {
    return this.CALL<{
      account_name: string;
      wasm: string;
      abi: string;
    }>(plugins.chain, methods.chain.rawCodeAndABI, {
      account_name: account
    });
  }

  /**
   * Get block header state
   * @param id Provide a block number or a block id
   */
  public getBlockHeaderState(id: string) {
    return this.CALL<any>(plugins.chain, methods.chain.blockHeaderState, {
      block_num_or_id: id
    });
  }

  /**
   * Get Balance of your account with token symbol
   * @param code token account name
   * @param account your account name
   * @param symbol option token symbol
   * @returns string e.g. `1.0001 EOS`
   */
  public getBalance(code: string, account: string, symbol?: string) {
    return this.CALL<string[]>(plugins.chain, methods.chain.balance, {
      account,
      code,
      symbol
    });
  }

  /**
   * This method expects a transaction in JSON format and will attempt to apply it to the blockchain.
   * @param signatures signatures array of signatures required to authorize transaction
   * @param compression compression used, usually false
   * @param packedCtxFreeData packed_context_free_data: json of hex
   * @param packedTrx packed_trx: json of hex
   */
  public pushTransaction(
    signatures: string[],
    compression: "true" | "false",
    packedCtxFreeData: string,
    packedTrx: string
  ) {
    return this.CALL<{
      transaction_id: string;
    }>(plugins.chain, methods.chain.sendTx, {
      compression,
      packed_context_free_data: packedCtxFreeData,
      packed_tx: packedTrx,
      signatures
    });
  }

  /**
   * Serializes json to binary hex.
   * The resulting binary hex is usually used for the data field in push_transaction.
   * @param code Account name
   * @param action action name
   * @param args json args
   */
  public abiJSONToBin(code: string, action: string, args: object) {
    return this.CALL<{ binargs: string }>(plugins.chain, methods.chain.atob, {
      action,
      args,
      code
    });
  }

  /**
   * Serializes binary hex to json.
   * @param code Account name
   * @param action action name
   * @param binargs binary args
   */
  public abiBinToJSON(code: string, action: string, binargs: string) {
    return this.CALL<{ args: any }>(plugins.chain, methods.chain.btoa, {
      action,
      binargs,
      code
    });
  }

  public getTxInfo(id: number) {
    return this.CALL<IEosTrx>(plugins.history, methods.history.tx, { id });
  }

  public getControlledAccounts(account: string) {
    return this.CALL<{ controlled_accounts: string[] }>(
      plugins.history,
      methods.history.ctrlAccounts,
      {
        controlling_account: account
      }
    );
  }
}
