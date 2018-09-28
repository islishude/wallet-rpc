import { IEosAccount, IEosBlockInfo, IEosChainInfo, IEosTrx } from "./mtd";
declare type EOSVersion = "v1";
interface ISendTxReturn {
    transaction_id: string;
}
export declare class EOSClient {
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
    CALL<T>(module: string, method: string, body?: object): Promise<T>;
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
    getAccount(account: string): Promise<IEosAccount>;
    /**
     * get ABI of providing account name
     * @param account
     */
    getABI(account: string): Promise<any>;
    getCode(account: string): Promise<any>;
    getRawCodeAndABI(account: string): Promise<any>;
    /**
     * Get block header state
     * @param id Provide a block number or a block id
     */
    getBlockHeaderState(id: string): Promise<any>;
    getBalance(code: string, account: string, symbol?: string): Promise<any>;
    /**
     * This method expects a transaction in JSON format and will attempt to apply it to the blockchain.
     * @param signatures signatures array of signatures required to authorize transaction
     * @param compression compression used, usually false
     * @param packedCtxFreeData packed_context_free_data: json of hex
     * @param packedTrx packed_trx: json of hex
     */
    pushTransaction(signatures: string[], compression: "true" | "false", packedCtxFreeData: string, packedTrx: string): Promise<ISendTxReturn>;
    pushTransactions(body: object): Promise<ISendTxReturn>;
    /**
     * Serializes json to binary hex.
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
    getKeyAccount(pubKey: string): Promise<any>;
    getControlledAccounts(account: string): Promise<any>;
}
export {};
