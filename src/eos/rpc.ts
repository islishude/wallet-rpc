import Axios from "axios";
import { log } from "console";
import { ErrorResolver } from "../helper";
import {
  EOSMethods as methods,
  EOSModules as modules,
  IEosAbi,
  IEosAccount,
  IEosBlockInfo,
  IEosChainInfo,
  IEosTrx
} from "./mtd";

type EOSVersion = "v1";

export class EOSClient {
  public static RAMFeeRequestData = {
    code: "eosio",
    json: true,
    scope: "eosio",
    table: "rammarket"
  };
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
    this.URL = `${url}/${ver}`;
  }

  public getCallURL(module: string, api: string): string {
    return `${this.URL}/${module}/${api}`;
  }

  /**
   * RPC Call helper func
   * @param method request method from "./mtd.ts"
   * @throws Request or Response error throw
   */
  public async CALL<T = any>(
    module: string,
    method: string,
    body?: object
  ): Promise<T> {
    const url: string = this.getCallURL(module, method);
    try {
      const result = await Axios.post<T>(url, body, { timeout: 60000 });
      return result.data;
    } catch (e) {
      throw new Error(ErrorResolver(e, url));
    }
  }

  /**
   * Returns an object containing various details about the blockchain.
   */
  public getInfo() {
    return this.CALL<IEosChainInfo>(modules.chain, methods.chain.info);
  }

  /**
   * Returns an object containing various details about a specific block on the blockchain.
   * @param id Provide a block number or a block id
   */
  public getBlock(id: string | number) {
    return this.CALL<IEosBlockInfo>(modules.chain, methods.chain.block, {
      block_num_or_id: id
    });
  }

  /**
   * Returns an object containing various details about a specific account on the blockchain.
   */
  public getAccountInfo(account: string) {
    return this.CALL<IEosAccount>(modules.chain, methods.chain.account, {
      account_name: account
    });
  }

  public getAccountsByPubKey(pubKey: string) {
    return this.CALL<{ accounts_name: string[] }>(
      modules.history,
      methods.history.tx,
      {
        public_key: pubKey
      }
    );
  }

  public getCurrencyStats(code: string, symbol: string) {
    return this.CALL<{ supply: string; max_supply: string; issuer: string }>(
      modules.chain,
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
    }>(modules.chain, methods.chain.abi, {
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
    }>(modules.chain, methods.chain.code, {
      account_name: account
    });
  }

  public getRawCodeAndABI(account: string) {
    return this.CALL<{
      account_name: string;
      wasm: string;
      abi: string;
    }>(modules.chain, methods.chain.rawCodeAndABI, {
      account_name: account
    });
  }

  public getTableRows<T = any>(data: {
    scope: string;
    code: string;
    table: string;
    json: boolean;
    lower_bound?: number;
    upper_bound?: number;
    limit?: number;
  }) {
    return this.CALL<{ rows: T[]; more: boolean }>(
      modules.chain,
      methods.chain.tableRows,
      data
    );
  }

  /**
   * Get block header state
   * @param id Provide a block number or a block id
   */
  public getBlockHeaderState(id: string) {
    return this.CALL<any>(modules.chain, methods.chain.blockHeaderState, {
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
    return this.CALL<string[]>(modules.chain, methods.chain.balance, {
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
    }>(modules.chain, methods.chain.sendTx, {
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
    return this.CALL<{ binargs: string }>(modules.chain, methods.chain.atob, {
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
    return this.CALL<{ args: any }>(modules.chain, methods.chain.btoa, {
      action,
      binargs,
      code
    });
  }

  public getTxInfo(id: number) {
    return this.CALL<IEosTrx>(modules.history, methods.history.tx, { id });
  }

  public getControlledAccounts(account: string) {
    return this.CALL<{ controlled_accounts: string[] }>(
      modules.history,
      methods.history.ctrlAccounts,
      {
        controlling_account: account
      }
    );
  }

  public async getRAMPrice() {
    const { rows } = await this.getTableRows<{
      supply: string;
      base: { balance: string; weight: string };
      quote: { balance: string; weight: string };
    }>(EOSClient.RAMFeeRequestData);

    const { base, quote } = rows[0];
    // RAM PRICE = (n * quote.balance) / (n + base.balance / 1024)
    const quoteBalance = Number(quote.balance.split(/\s/)[0]);
    const baseBalance = (1 + Number(base.balance.split(/\s/)[0])) / 1024;
    return (quoteBalance / baseBalance).toFixed(4);
  }

  public async getNETAndCPUPrice(refAccount: string = "eosnewyorkio") {
    const result = await this.getAccountInfo(refAccount);
    const netStaked = Number(result.total_resources.net_weight.split(/\s/)[0]);
    // convert bytes to kilobytes
    const netAvailable = result.net_limit.max / 1024;

    const cpuStaked = Number(result.total_resources.cpu_weight.split(/\s/)[0]);
    // convert microseconds to milliseconds
    const cpuAvailable = result.cpu_limit.max / 1000;

    return {
      cpuPrice: (cpuStaked / cpuAvailable).toFixed(4),
      netPrice: (netStaked / netAvailable).toFixed(4)
    };
  }
}
