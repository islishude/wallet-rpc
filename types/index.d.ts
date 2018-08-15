import { BitcoinClient } from "./bitcoin/rpc";
import { DKKTClient } from "./dkktoken/rpc";
import { EthereumClient } from "./ethereum/rpc";
import * as EthereumUtil from "./ethereum/util";
import { OmniLayerClient } from "./omni/rpc";
export declare const Bitcoin: {
    mtd: {
        block: {
            count: string;
            detail: string;
            hash: string;
        };
        fee: string;
        info: {
            chain: string;
            difficulty: string;
            info: string;
            memory: string;
            wallet: string;
        };
        mempool: {
            detail: string;
        };
        tx: {
            decode: string;
            detail: string;
            raw: string;
            sendRaw: string;
        };
    };
    RPC: typeof BitcoinClient;
};
export declare const Ethereum: {
    RPC: typeof EthereumClient;
    mtd: {
        info: {
            syncing: string;
        };
        tool: {
            sign: string;
        };
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
            rawByHash: string;
            byHash: string;
            byHeight: string;
            call: string;
            receipt: string;
            send: string;
            sendRaw: string;
            parity: {
                trace: string;
            };
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
    util: typeof EthereumUtil;
};
export declare const DKKToken: {
    mtd: {
        block: {
            count: string;
            detail: string;
            hash: string;
        };
        info: string;
        mempool: string;
        tx: {
            decode: string;
            detail: string;
            raw: string;
            sendRaw: string;
        };
    };
    RPC: typeof DKKTClient;
};
export declare const OmniLayer: {
    mtd: {
        block: {
            count: string;
        };
        info: {
            client: string;
        };
        property: {
            list: string;
            info: string;
        };
        address: {
            balance: string;
            allBalance: string;
        };
        tx: {
            detail: string;
            payload: string;
            sendRaw: string;
            list: string;
            pending: string;
            wallet: string;
        };
    };
    RPC: typeof OmniLayerClient;
};
