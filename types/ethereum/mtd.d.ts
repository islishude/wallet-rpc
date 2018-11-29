export declare const EthereumMethods: {
    address: {
        balance: string;
        code: string;
        nonce: string;
        parity: {
            pendingNonce: string;
        };
    };
    block: {
        byHash: string;
        byHeight: string;
        count: string;
        txCountByHash: string;
        txCountByHeight: string;
    };
    debug: {
        traceBlock: string;
        traceTx: string;
    };
    gas: {
        estimate: string;
        price: string;
    };
    info: {
        syncing: string;
    };
    tool: {
        sign: string;
    };
    tx: {
        byHash: string;
        byHeight: string;
        call: string;
        parity: {
            trace: string;
        };
        rawByHash: string;
        receipt: string;
        send: string;
        sendRaw: string;
    };
    txpool: {
        content: string;
        inspect: string;
        status: string;
    };
    uncle: {
        byHash: string;
        byHeight: string;
    };
};
