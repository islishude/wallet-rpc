"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mtd_1 = require("./bitcoin/mtd");
const rpc_1 = require("./bitcoin/rpc");
const mtd_2 = require("./dkktoken/mtd");
const rpc_2 = require("./dkktoken/rpc");
const mtd_3 = require("./ethereum/mtd");
const rpc_3 = require("./ethereum/rpc");
const EthereumUtil = require("./ethereum/util");
const mtd_4 = require("./omni/mtd");
const rpc_4 = require("./omni/rpc");
exports.Bitcoin = { mtd: mtd_1.BitcoinMethods, RPC: rpc_1.BitcoinClient };
exports.Ethereum = {
    RPC: rpc_3.EthereumClient,
    mtd: mtd_3.EthereumMethods,
    util: EthereumUtil
};
exports.DKKToken = { mtd: mtd_2.DKKTokenMethods, RPC: rpc_2.DKKTClient };
exports.OmniLayer = { mtd: mtd_4.OmniLayerMethods, RPC: rpc_4.OmniLayerClient };
