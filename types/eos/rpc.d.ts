import { IEosAbi, IEosAccount, IEosBlockInfo, IEosChainInfo, IEosTrx } from "./mtd";
declare type EOSVersion = "v1";
export declare class EOSClient {
    static RAMFeeRequestData: {
        code: string;
        json: boolean;
        scope: string;
        table: string;
    };
    URL: string;
    /**
     * EOS RPC isn't JSONRPC,so here is diff with bitcoin.
     * @param url schema+ip+url e.g. http://127.0.0.1:8888
     * @param ver API Version Now only supports `v1`
     */
    constructor(url?: string, ver?: EOSVersion);
    getCallURL(module: string, api: string): string;
    /**
     * RPC Call helper func
     * @param method request method from "./mtd.ts"
     * @throws Request or Response error throw
     */
    CALL<T = any>(module: string, method: string, body?: object): Promise<T>;
    /**
     * Returns an object containing various details about the blockchain.
     */
    getInfo(): Promise<IEosChainInfo>;
    /**
     * Returns an object containing various details about a specific block on the blockchain.
     * @param id Provide a block number or a block id
     */
    getBlock(id: string | number): Promise<IEosBlockInfo>;
    /**
     * Returns an object containing various details about a specific account on the blockchain.
     */
    getAccountInfo(account: string): Promise<IEosAccount>;
    getAccountsByPubKey(pubKey: string): Promise<{
        accounts_name: string[];
    }>;
    getCurrencyStats(code: string, symbol: string): Promise<{
        supply: string;
        max_supply: string;
        issuer: string;
    }>;
    /**
     * get ABI of providing account name
     * @param account
     */
    getABI(account: string): Promise<{
        account_name: string;
        abi: IEosAbi;
    }>;
    getCode(account: string): Promise<{
        account_name: string;
        code_hash: string;
        wast: string;
        wasm: string;
        abi: IEosAbi;
    }>;
    getRawCodeAndABI(account: string): Promise<{
        account_name: string;
        wasm: string;
        abi: string;
    }>;
    getTableRows<T = any>(data: {
        scope: string;
        code: string;
        table: string;
        json: boolean;
        lower_bound?: number;
        upper_bound?: number;
        limit?: number;
    }): Promise<{
        rows: T[];
        more: boolean;
    }>;
    /**
     * Get block header state
     * @param id Provide a block number or a block id
     */
    getBlockHeaderState(id: string): Promise<any>;
    /**
     * Get Balance of your account with token symbol
     * @param code token account name
     * @param account your account name
     * @param symbol option token symbol
     * @returns string e.g. `1.0001 EOS`
     */
    getBalance(code: string, account: string, symbol?: string): Promise<string[]>;
    /**
     * This method expects a transaction in JSON format and will attempt to apply it to the blockchain.
     * @param signatures signatures array of signatures required to authorize transaction
     * @param compression compression used, usually false
     * @param packedCtxFreeData packed_context_free_data: json of hex
     * @param packedTrx packed_trx: json of hex
     */
    pushTransaction(signatures: string[], compression: "true" | "false", packedCtxFreeData: string, packedTrx: string): Promise<{
        transaction_id: string;
    }>;
    /**
     * Serializes json to binary hex.
     *
     * The resulting binary hex is usually used for the data field in push_transaction.
     * @param code Account name
     * @param action action name
     * @param args json args
     */
    abiJSONToBin(code: string, action: string, args: object): Promise<{
        binargs: string;
    }>;
    /**
     * Serializes binary hex to json.
     * @param code Account name
     * @param action action name
     * @param binargs binary args
     */
    abiBinToJSON(code: string, action: string, binargs: string): Promise<{
        args: any;
    }>;
    getTxInfo(id: number): Promise<IEosTrx>;
    getControlledAccounts(account: string): Promise<{
        controlled_accounts: string[];
    }>;
    getRAMPrice(): Promise<string>;
    /**
     * Get NET And CPU price
     *
     * get these value should compute from a referer account,
     * so you can pass a EOS exchange platform account
     */
    getNETAndCPUPrice(refAccount?: string): Promise<{
        cpuPrice: string;
        netPrice: string;
    }>;
}
export {};
