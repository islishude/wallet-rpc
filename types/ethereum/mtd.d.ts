export declare const EthereumMethods: {
    address: {
        balance: string;
        code: string;
        nonce: string;
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
    tx: {
        byHash: string;
        byHeight: string;
        call: string;
        receipt: string;
        send: string;
        sendRaw: string;
    };
    txpool: {
        content: string;
        status: string;
    };
    uncle: {
        byHash: string;
        byHeight: string;
    };
};
