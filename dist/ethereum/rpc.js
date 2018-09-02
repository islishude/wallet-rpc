"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const bignumber_js_1 = require("bignumber.js");
const client_1 = require("../client");
const mtd_1 = require("./mtd");
const util_1 = require("./util");
class EthereumClient extends client_1.default {
    // go-ethereum client RPC settings has no user and password for rpc
    constructor(conf) {
        const ip = conf.ip || "http://127.0.0.1";
        const user = conf.user || "";
        const pass = conf.pass || "";
        const port = conf.port || "8545";
        super(user, pass, ip, port);
    }
    /**
     * Returns an object with data about the sync status or false.
     * returns value
     * startingBlock: QUANTITY - The block at which the import started (will only be reset, after the sync reached his head)
     * currentBlock: QUANTITY - The current block, same as eth_blockNumber
     * highestBlock: QUANTITY - The estimated highest block
     */
    syncProgress() {
        return this.RpcCall(mtd_1.EthereumMethods.info.syncing, []);
    }
    getBalance(address, status = "latest") {
        return this.RpcCall(mtd_1.EthereumMethods.address.balance, [address, status]);
    }
    // get block count
    // return hex number
    getBlockCount() {
        return this.RpcCall(mtd_1.EthereumMethods.block.count);
    }
    getBlockByHash(hash, getFullTx = false) {
        const param = [hash, getFullTx];
        return this.RpcCall(mtd_1.EthereumMethods.block.byHash, param);
    }
    /**
     * Get information about a block by block number.
     * @param symbol QUANTITY|TAG - integer of a block number, or the string "earliest", "latest" or "pending", as in the default block parameter.
     * @see https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_getblockbynumber
     */
    getBlock(symbol) {
        const param = [symbol, false];
        return this.RpcCall(mtd_1.EthereumMethods.block.byHeight, param);
    }
    getBlockVerbose(symbol) {
        const param = [symbol, true];
        return this.RpcCall(mtd_1.EthereumMethods.block.byHeight, param);
    }
    getTxByHash(hash) {
        return this.RpcCall(mtd_1.EthereumMethods.tx.byHash, [hash]);
    }
    /**
     * Return raw transaction by hash
     * There is an "undocumented" method eth_getRawTransactionByHash
     * @param hash
     */
    getRawTxByHash(hash) {
        return this.RpcCall(mtd_1.EthereumMethods.tx.rawByHash, [hash]);
    }
    /**
     * Returns the receipt of a transaction by transaction hash.
     * Note That the receipt is not available for pending transactions.
     * @param hash tx hash
     * @see https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_gettransactionreceipt
     * @see https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_getfilterchanges
     */
    getTxReceipt(hash) {
        return this.RpcCall(mtd_1.EthereumMethods.tx.receipt, [hash]);
    }
    sendRawTx(raw) {
        return this.RpcCall(mtd_1.EthereumMethods.tx.sendRaw, [raw]);
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
    sendTx(tx) {
        return this.RpcCall(mtd_1.EthereumMethods.tx.send, [tx]);
    }
    /**
     * Returns the number of transactions sent from an address.
     * alias for getTxCount
     * Geth(<=1.8.12) now doesn't supports pending nonce.
     * please use `parity` with `getAddrNextNonce` in the flow func
     */
    getAddrNonce(address, status = "latest") {
        const param = [address, status];
        return this.RpcCall(mtd_1.EthereumMethods.address.nonce, param);
    }
    /**
     * Returns next available nonce for transaction from given account.
     * Includes pending block and transaction queue.
     * !! Only for parity node
     * @param address
     * @see https://wiki.parity.io/JSONRPC-parity-module#parity_nextnonce
     */
    getAddrNextNonce(address) {
        return this.RpcCall(mtd_1.EthereumMethods.address.parity.pendingNonce, [address]);
    }
    /**
     * Returns the current price per gas in wei.
     * @see https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_gasprice
     */
    getCurrentGasPrice() {
        return this.RpcCall(mtd_1.EthereumMethods.gas.price, []);
    }
    /**
     * Executes a new message call immediately without creating a transaction on the block chain.
     * @see https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_call
     */
    callFunc(param, status = "latest") {
        return this.RpcCall(mtd_1.EthereumMethods.tx.call, [param, status]);
    }
    /**
     * Returns code at a given address.
     * @param address DATA, 20 Bytes - address
     * @param status integer block number, or the string "latest", "earliest" or "pending"
     * @returns the code from the given address
     */
    getCode(address, status) {
        return this.RpcCall(mtd_1.EthereumMethods.address.code, [address, status]);
    }
    /**
     * Detect the address given is contract address or not
     * but if contract self destructor would be return false
     * @param address string
     * @param status string
     * @returns boolean
     */
    async isContract(address) {
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
    getEstimateGas(param) {
        return this.RpcCall(mtd_1.EthereumMethods.gas.estimate, [param]);
    }
    /**
     * Sign Message.
     * NOT Supports address which doesn't in you eth-rpc
     * @param address the address to sign with must be unlocked.
     * @param data N Bytes - message to sign
     */
    signMessage(address, data) {
        assert_1.ok(util_1.isAddress(address), "Not a valid Ethereum address");
        return this.RpcCall(mtd_1.EthereumMethods.tool.sign, [address, data.toString("hex")]);
    }
    /**
     * debug trace transaction
     * you should start geth with `--rpcapi="web3,trace"
     * @see https://github.com/ethereum/go-ethereum/wiki/Management-APIs#debug_tracetransaction
     */
    traceTx(txid, opt) {
        return this.RpcCall(mtd_1.EthereumMethods.debug.traceTx, [txid, opt]);
    }
    traceTxByParity(txid) {
        return this.RpcCall(mtd_1.EthereumMethods.tx.parity.trace, [txid]);
    }
    async ERC20Balance(token, address, isPending = true) {
        const status = isPending ? "pending" : "latest";
        const param = {
            data: util_1.ERC20FuncSig.balanceOf + util_1.padAddress(address),
            to: token
        };
        const { result: balance } = await this.callFunc(param, status);
        return balance;
    }
    async ERC20Decimals(token) {
        const param = {
            data: util_1.ERC20FuncSig.decimals,
            to: token
        };
        const PARAM = {
            data: util_1.ERC20FuncSigUpper.DECIMALS,
            to: token
        };
        const [{ result: decimals }, { result: DECIMALS }] = await Promise.all([
            this.callFunc(param),
            this.callFunc(PARAM)
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
        return util_1.hexToNumber(tmp);
    }
    async ERC20TotalSupply(token) {
        const param = {
            data: util_1.ERC20FuncSig.totalSupply,
            to: token
        };
        const { result: totalSupply } = await this.callFunc(param);
        if (totalSupply === "0x" || totalSupply === undefined) {
            return;
        }
        return util_1.hexToDecimalString(totalSupply);
    }
    async ERC20Name(token) {
        const param = {
            data: util_1.ERC20FuncSig.name,
            to: token
        };
        const PARAM = {
            data: util_1.ERC20FuncSigUpper.NAME,
            to: token
        };
        const [{ result: name }, { result: NAME }] = await Promise.all([
            this.callFunc(param),
            this.callFunc(PARAM)
        ]);
        if (name === "0x" && NAME === "0x") {
            return;
        }
        // For parity fix
        // If a contract ISN'T a ERC20 will be throw
        if (name === undefined && NAME === undefined) {
            return;
        }
        const tmp = name === "0x" ? NAME : name;
        if (!tmp) {
            return;
        }
        return util_1.toUtf8(tmp);
    }
    async ERC20Symbol(token) {
        const param = {
            data: util_1.ERC20FuncSig.symbol,
            to: token
        };
        const PARAM = {
            data: util_1.ERC20FuncSigUpper.SYMBOL,
            to: token
        };
        const [{ result: symbol }, { result: SYMBOL }] = await Promise.all([
            this.callFunc(param),
            this.callFunc(PARAM)
        ]);
        if (symbol === "0x" && SYMBOL === "0x") {
            return;
        }
        // For parity fix
        // If a contract ISN'T a ERC20 will be throw
        if (!symbol && !SYMBOL) {
            return;
        }
        const tmp = symbol === "0x" ? SYMBOL : symbol;
        if (!tmp) {
            return;
        }
        return util_1.toUtf8(tmp);
    }
    async ERC20TokenInfo(token) {
        const [name, symbol, decimals, totalSupply] = await Promise.all([
            this.ERC20Name(token),
            this.ERC20Symbol(token),
            this.ERC20Decimals(token),
            this.ERC20TotalSupply(token)
        ]);
        return {
            address: token,
            decimals,
            // if name === "" set it equal with symbol
            // eg. EOS token has no name
            name: name || symbol,
            symbol: symbol || name,
            // For ERC721 it's not fixed
            totalSupply: totalSupply === undefined
                ? undefined
                : new bignumber_js_1.default(totalSupply).div(new bignumber_js_1.default(10).pow(decimals || 0)).toString(10)
        };
    }
}
exports.EthereumClient = EthereumClient;
