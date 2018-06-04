import { BitcoinClient } from "./bitcoin/rpc";
import { DKKTClient } from "./dkktoken/rpc";
import { EthereumClient } from "./ethereum/rpc";
export declare const CoinRpc: {
    bitcoin: {
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
        rpc: typeof BitcoinClient;
    };
    dkktoken: {
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
        rpc: typeof DKKTClient;
    };
    ethereum: {
        mtd: {
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
        rpc: typeof EthereumClient;
        util: {
            ERC20FuncSig: {
                allowance: string;
                approve: string;
                balanceOf: string;
                decimals: string;
                name: string;
                symbol: string;
                totalSupply: string;
                transfer: string;
                transferFrom: string;
            };
            hexToNumber: (hex: string) => number;
            isAddress: (address: string) => boolean;
            isChecksumAddress: (address: string) => boolean;
            numberToHex: (int: number) => string;
            sha3: (message: string) => string;
        };
    };
};
