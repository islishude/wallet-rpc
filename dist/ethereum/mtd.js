"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumMethods = {
    info: {
        syncing: "eth_syncing"
    },
    tool: {
        sign: "eth_sign"
    },
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
    tx: {
        rawByHash: "eth_getRawTransactionByHash",
        byHash: "eth_getTransactionByHash",
        byHeight: "eth_getTransactionByBlockHashAndIndex",
        call: "eth_call",
        receipt: "eth_getTransactionReceipt",
        send: "eth_sendTransaction",
        sendRaw: "eth_sendRawTransaction",
        parity: {
            trace: "trace_transaction"
        }
    },
    txpool: {
        content: "txpool_content",
        status: "txpool_status"
    },
    uncle: {
        byHash: "eth_getUncleByBlockHashAndIndex",
        byHeight: "eth_getUncleByBlockHashAndIndex"
    }
};
