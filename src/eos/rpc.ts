import { IHTTPClient } from "./client";
import {
  IEosAbi,
  IEosAccount,
  IEosBlockInfo,
  IEosChainInfo,
  IEosProds,
  IEosProdsTable,
  IEosRamTable,
  IEosTrx,
} from "./type";

export class EOSClient {
  public client: IHTTPClient;

  public constructor(client: IHTTPClient) {
    this.client = client;
  }

  /**
   * Returns an object containing various details about the blockchain.
   */
  public getInfo() {
    return this.client.Get<IEosChainInfo>("/v1/chain/get_info");
  }

  /**
   * Returns an object containing various details about a specific block on the blockchain.
   * @param id Provide a block number or a block id
   */
  public getBlock(id: string | number) {
    return this.client.Post<IEosBlockInfo>("/v1/chain/get_block", {
      block_num_or_id: id,
    });
  }

  /**
   * Returns an object containing various details about a specific account on the blockchain.
   */
  public getAccountInfo(account: string) {
    return this.client.Post<IEosAccount>("/v1/chain/get_account", {
      account_name: account,
    });
  }

  /**
   * Get account list under public key provided
   * ref to `get_key_accounts`
   * @see https://developers.eos.io/eosio-nodeos/reference#get_key_accounts-1
   */
  public getKeyAccount(pubKey: string) {
    return this.client.Post<{ accounts_name: string[] }>(
      "/v1/history/get_key_accounts",
      {
        public_key: pubKey,
      },
    );
  }

  public getCurrentStats(code: string, symbol: string) {
    return this.client.Post<{
      supply: string;
      max_supply: string;
      issuer: string;
    }>("/1/chain/get_currency_stats", { code, symbol });
  }

  /**
   * get ABI of providing account name
   * @param account
   */
  public getABI(account: string) {
    return this.client.Post<{
      account_name: string;
      abi: IEosAbi;
    }>("/v1/chain/get_abi", {
      account_name: account,
    });
  }

  public getCode(account: string) {
    return this.client.Post<{
      account_name: string;
      code_hash: string;
      wast: string;
      wasm: string;
      abi: IEosAbi;
    }>("/v1/chain/get_code", {
      account_name: account,
    });
  }

  public getRawCodeAndABI(account: string) {
    return this.client.Post<{
      account_name: string;
      wasm: string;
      abi: string;
    }>("/v1/chain/get_raw_code_and_abi", {
      account_name: account,
    });
  }

  /**
   * Returns an object containing rows from the specified table.
   */
  public getTableRows<T = any>(data: {
    // The account name where the scope of the data resides
    scope: string | number;
    // The name of the smart contract that controls the provided table
    code: string | number;
    // The name of the table to query
    table: string;
    // Return json object or return formatted response
    json: boolean;
    table_key?: string;
    // Filters results to return the first element that is not lesser than provided value in set
    lower_bound?: string | number;
    // Filters results to return the first element that is greater than provided value in set
    upper_bound?: string | number;
    // Limit results returned in response
    limit?: number;
    // Type of key specified by index_position (for example: uint64_t or name)
    key_type?: string | number;
    // 1 for primary index;2 for secondary index,etc
    index_position?: number;
    encode_type?: "dec" | "hex";
  }) {
    return this.client.Post<{ rows: T[]; more: boolean }>(
      "/v1/chain/get_table_rows",
      data,
    );
  }

  public getTableByScope<T = any>(data: {
    code: string;
    table: string;
    // Filters results to return the first element that is not lesser than provided value in set
    lower_bound?: string | number;
    // Filters results to return the first element that is greater than provided value in set
    upper_bound?: string | number;
    // Limit results returned in response
    limit?: number;
  }) {
    return this.client.Post<{ rows: T[]; more: boolean }>(
      "/v1/chain/get_table_by_scope",
      data,
    );
  }

  /**
   * Get block header state
   * @param id Provide a block number or a block id
   */
  public getBlockHeaderState(id: string) {
    return this.client.Post<any>("/v1/chian/get_block_header_state", {
      block_num_or_id: id,
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
    return this.client.Post<string[]>("/v1/chain/get_currency_balance", {
      account,
      code,
      symbol,
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
    packedTrx: string,
  ) {
    return this.client.Post<{
      transaction_id: string;
    }>("/v1/chain/push_transaction", {
      compression,
      packed_context_free_data: packedCtxFreeData,
      packed_tx: packedTrx,
      signatures,
    });
  }

  /**
   * Serializes json to binary hex.
   *
   * The resulting binary hex is usually used for the data field in push_transaction.
   * @param code Account name
   * @param action action name
   * @param args json args
   */
  public abiJSONToBin(code: string, action: string, args: object) {
    return this.client.Post<{ binargs: string }>("/v1/chain/abi_json_to_bin", {
      action,
      args,
      code,
    });
  }

  /**
   * Serializes binary hex to json.
   * @param code Account name
   * @param action action name
   * @param binargs binary args
   */
  public abiBinToJSON(code: string, action: string, binargs: string) {
    return this.client.Post<{ args: any }>("/v1/chain/abi_json_to_bin", {
      action,
      binargs,
      code,
    });
  }

  public getTxInfo(id: number) {
    return this.client.Post<IEosTrx>("/v1/history/get_transaction", {
      id,
    });
  }

  public getControlledAccounts(account: string) {
    return this.client.Post<{ controlled_accounts: string[] }>(
      "v1/history/get_controlled_accounts",
      {
        controlling_account: account,
      },
    );
  }

  public async getRAMPrice() {
    const {
      body: { rows },
    } = await this.getTableRows<IEosRamTable>({
      code: "eosio",
      json: true,
      scope: "eosio",
      table: "rammarket",
    });
    const { base, quote } = rows[0];
    // RAM PRICE = (n * quote.balance) / (n + base.balance / 1024)
    const quoteBalance = Number(quote.balance.split(/\s/)[0]);
    const baseBalance = 1 + Number(base.balance.split(/\s/)[0]);
    return (quoteBalance / (baseBalance / 1024)).toFixed(4);
  }

  /**
   * Get NET And CPU price
   *
   * get these value should compute from a referer account,
   * so best suggestion is that gives a EOS exchange platform account
   */
  public async getNetAndCpuPrice(refAccount: string = "heztanrqgene") {
    const {
      body: { net_limit, cpu_limit, net_weight, cpu_weight },
    } = await this.getAccountInfo(refAccount);
    const netStaked = net_weight / 10000;
    // convert bytes to kilobytes
    const netAvailable = net_limit.max / 1024;

    const cpuStaked = cpu_weight / 10000;
    // convert microseconds to milliseconds
    const cpuAvailable = cpu_limit.max / 1000;

    if (cpuAvailable === 0 || netAvailable === 0) {
      const errInvalidRefAccount =
        "[EOS::GetNetAndCpuPrice] " +
        "Available CPU or NET is zero! " +
        "Please check your refAccount and then call this.";
      throw new Error(errInvalidRefAccount);
    }

    return {
      cpuPrice: (cpuStaked / cpuAvailable).toFixed(4),
      netPrice: (netStaked / netAvailable).toFixed(4),
    };
  }

  /**
   * Get producer list,available 1.4 or above,call `getProducerTable` if you run in lower version
   * @param limit count you wanna
   * @param lowBound a-z 1-5
   */
  public async getProducerList(limit: number, lowBound: string) {
    return this.client.Post<IEosProds>("/v1/chain/get_producers", {
      json: true,
      limit,
      lower_bound: lowBound,
    });
  }

  /**
   * Get producer list,available 1.0 version or above
   * @param limit count you wanna
   * @param lowBound a-z 1-5
   * @param upperBound a-z 1-5
   * @example find producer list which name start with `a`.
   * getProducerTable({ lowBound: "a", upperBound: "b", limit: 1000 })
   */
  public async getProducerTable(
    lowBound: string,
    upperBound: string,
    limit: number = 1000,
  ) {
    return this.getTableRows<IEosProdsTable>({
      code: "eosio",
      json: true,
      limit,
      lower_bound: lowBound,
      scope: "eosio",
      table: "producers",
      upper_bound: upperBound,
    });
  }
}
