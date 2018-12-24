/// <reference types="node" />
import RPCClient from "../client";
import { IRpcConfig, IRpcResponse } from "../type";
import { IEthBlock, IEthBlockSimple, IEthBlockVerbose, IEthCallFuncParam, IEthSentTxStruct, IEthStatus, IEthSyncing, IEthTraceTxReturn, IEthTx, IEthTxPoolContent, IEthTxPoolInspect, IEthTxPoolStatus, IEthTxReceipt, IParityTxTrace } from "./type";
export declare class EthereumClient extends RPCClient {
    constructor(conf?: IRpcConfig);
    /**
     * Returns an object with data about the sync status or false.
     * returns value
     * startingBlock: QUANTITY - The block at which the import started (will only be reset, after the sync reached his head)
     * currentBlock: QUANTITY - The current block, same as eth_blockNumber
     * highestBlock: QUANTITY - The estimated highest block
     */
    syncProgress(): Promise<IRpcResponse<boolean | IEthSyncing>>;
    getBalance(address: string, status?: IEthStatus): Promise<IRpcResponse<string>>;
    getBlockCount(): Promise<IRpcResponse<string>>;
    getHeight(): Promise<IRpcResponse<string>>;
    getBlockByHash(hash: string, getFullTx?: boolean): Promise<IRpcResponse<IEthBlock>>;
    /**
     * Get information about a block by block number.
     * @param symbol QUANTITY|TAG - integer of a block number, or the string "earliest", "latest" or "pending", as in the default block parameter.
     * @see https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_getblockbynumber
     */
    getBlock(symbol: string): Promise<IRpcResponse<IEthBlockSimple>>;
    getBlockVerbose(symbol: string): Promise<IRpcResponse<IEthBlockVerbose>>;
    getTxByHash(hash: string): Promise<IRpcResponse<IEthTx | null>>;
    /**
     * Return raw transaction by hash
     * There is an "undocumented" method eth_getRawTransactionByHash
     * @param hash
     */
    getRawTxByHash(hash: string): Promise<IRpcResponse<string>>;
    /**
     * Returns the receipt of a transaction by transaction hash.
     * Note That the receipt is not available for pending transactions.
     * @param hash tx hash
     * @see https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_gettransactionreceipt
     * @see https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_getfilterchanges
     */
    getTxReceipt(hash: string): Promise<IRpcResponse<IEthTxReceipt | null>>;
    sendRawTx(raw: string): Promise<IRpcResponse<string>>;
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
    sendTx(tx: IEthSentTxStruct): Promise<IRpcResponse<string>>;
    /**
     * Returns the number of transactions sent from an address.
     * alias for getTxCount
     * Geth(<=1.8.12) now doesn't supports pending nonce.
     * please use `parity` with `getAddrNextNonce` in the flow func
     */
    getAddrNonce(address: string, status?: IEthStatus): Promise<IRpcResponse<string>>;
    /**
     * Returns next available nonce for transaction from given account.
     * Includes pending block and transaction queue.
     * !! Only for parity node
     * @param address
     * @see https://wiki.parity.io/JSONRPC-parity-module#parity_nextnonce
     */
    getAddrNextNonce(address: string): Promise<IRpcResponse<string>>;
    /**
     * Returns the current price per gas in wei.
     * @see https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_gasprice
     */
    getCurrentGasPrice(): Promise<IRpcResponse<string>>;
    /**
     * Executes a new message call immediately without creating a transaction on the block chain.
     * @see https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_call
     */
    callFunc(param: IEthCallFuncParam, status?: IEthStatus): Promise<IRpcResponse<string>>;
    /**
     * Returns code at a given address.
     * @param address DATA, 20 Bytes - address
     * @param status integer block number, or the string "latest", "earliest" or "pending"
     * @returns the code from the given address
     */
    getCode(address: string, status: IEthStatus): Promise<IRpcResponse<string>>;
    /**
     * Detect the address given is contract address or not
     * but if contract self destructor would be return false
     * @param address string
     * @param status string
     * @returns boolean
     */
    isContract(address: string): Promise<boolean>;
    /**
     * Generates and returns an estimate of how much gas is necessary to allow the transaction to complete.
     * The transaction will not be added to the blockchain.
     * Note that the estimate may be significantly more than the amount of gas actually used by the transaction,
     * for a variety of reasons including EVM mechanics and node performance.
     */
    getEstimateGas(param: IEthCallFuncParam): Promise<IRpcResponse<string>>;
    /**
     * Sign Message.
     * NOT Supports address which doesn't in you eth-rpc
     * @param address the address to sign with must be unlocked.
     * @param data N Bytes - message to sign
     */
    signMessage(address: string, data: Buffer): Promise<IRpcResponse<string>>;
    /**
     * debug trace transaction
     * you should start geth with `--rpcapi="web3,trace"
     * @see https://github.com/ethereum/go-ethereum/wiki/Management-APIs#debug_tracetransaction
     */
    traceTx(txid: string, opt?: {
        disableStorage?: boolean;
        disableMemory?: boolean;
        disableStack?: boolean;
        trace?: string;
        timeout?: string;
    }): Promise<IRpcResponse<IEthTraceTxReturn>>;
    traceTxByParity(txid: string): Promise<IRpcResponse<IParityTxTrace[] | null>>;
    txpoolContent(): Promise<IRpcResponse<IEthTxPoolContent>>;
    txpoolInspect(): Promise<IRpcResponse<IEthTxPoolInspect>>;
    txpoolStatus(): Promise<IRpcResponse<IEthTxPoolStatus>>;
    ParityPendingTrx(): Promise<IRpcResponse<IEthTx[]>>;
    ParityRemoveTrx(hash: string): Promise<IRpcResponse<IEthTx | null>>;
    ERC20Balance(token: string, address: string, isPending?: boolean): Promise<string>;
    ERC20Decimals(token: string): Promise<undefined | number>;
    ERC20TotalSupply(token: string): Promise<string | undefined>;
    ERC20Name(token: string): Promise<undefined | string>;
    ERC20Symbol(token: string): Promise<undefined | string>;
    ERC20TokenInfo(token: string): Promise<{
        decimals: number | undefined;
        name: string | undefined;
        symbol: string | undefined;
        totalSupply: string | undefined;
    }>;
}
