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
    /**
     * RPC Call helper func
     * @param method request method from "./mtd.ts"
     * @throws Request or Response error throw
     */
    CALL<T>(method: string, body?: object): Promise<T>;
    /**
     * Returns an object containing various details about the blockchain.
     */
    getInfo(): Promise<IEosChainInfo>;
    /**
     * Returns an object containing various details about a specific block on the blockchain.
     * @param id Provide a block number or a block id
     */
    getBlock(id: string): Promise<IEosBlockInfo>;
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
    getBalance(code: string, account: string, symbol: string): Promise<any>;
    /**
     * This method expects a transaction in JSON format and will attempt to apply it to the blockchain.
     * @param signs signatures array of signatures required to authorize transaction
     * @param compression compression used, usually false
     * @param data packed_context_free_data: json of hex
     * @param tx packed_trx: json of hex
     */
    sendTx(signs: string[], compression: "true" | "false", data: string, tx: string): Promise<ISendTxReturn>;
    sendTxes(body: object): Promise<ISendTxReturn>;
    getTxInfo(id: number): Promise<any>;
    getKeyAccount(pubKey: string): Promise<any>;
    getControlledAccounts(account: string): Promise<any>;
}
export {};
