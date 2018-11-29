"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumMethods = {
    address: {
        balance: "eth_getBalance",
        code: "eth_getCode",
        nonce: "eth_getTransactionCount",
        parity: {
            pendingNonce: "parity_nextNonce"
        }
    },
    block: {
        byHash: "eth_getBlockByHash",
        byHeight: "eth_getBlockByNumber",
        count: "eth_blockNumber",
        txCountByHash: "eth_getBlockTransactionCountByHash",
        txCountByHeight: "eth_getBlockTransactionCountByNumber"
    },
    debug: {
        traceBlock: "debug_traceBlock",
        traceTx: "debug_traceTransaction"
    },
    gas: {
        estimate: "eth_estimateGas",
        price: "eth_gasPrice"
    },
    info: {
        syncing: "eth_syncing"
    },
    tool: {
        sign: "eth_sign"
    },
    tx: {
        byHash: "eth_getTransactionByHash",
        byHeight: "eth_getTransactionByBlockHashAndIndex",
        call: "eth_call",
        parity: {
            trace: "trace_transaction"
        },
        rawByHash: "eth_getRawTransactionByHash",
        receipt: "eth_getTransactionReceipt",
        send: "eth_sendTransaction",
        sendRaw: "eth_sendRawTransaction"
    },
    txpool: {
        content: "txpool_content",
        inspect: "txpool_inspect",
        status: "txpool_status"
    },
    uncle: {
        byHash: "eth_getUncleByBlockHashAndIndex",
        byHeight: "eth_getUncleByBlockHashAndIndex"
    }
};
