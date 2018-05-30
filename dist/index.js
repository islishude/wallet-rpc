"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mtd_1 = require("./bitcoin/mtd");
const rpc_1 = require("./bitcoin/rpc");
const mtd_2 = require("./dkktoken/mtd");
const rpc_2 = require("./dkktoken/rpc");
const mtd_3 = require("./ethereum/mtd");
const rpc_3 = require("./ethereum/rpc");
exports.CoinRpc = {
    bitcoin: {
        mtd: mtd_1.BitcoinMethods,
        rpc: rpc_1.BitcoinClient
    },
    dkktoken: {
        mtd: mtd_2.DKKTokenMethods,
        rpc: rpc_2.DKKTClient
    },
    ethereum: {
        mtd: mtd_3.EthereumMethods,
        rpc: rpc_3.EthereumClient
    }
};
