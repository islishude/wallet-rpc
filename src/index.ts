import { BitcoinMethods } from "./bitcoin/mtd";
import { BitcoinClient } from "./bitcoin/rpc";
import { DKKTokenMethods } from "./dkktoken/mtd";
import { DKKTClient } from "./dkktoken/rpc";
import { EthereumMethods } from "./ethereum/mtd";
import { EthereumClient } from "./ethereum/rpc";

export const CoinRpc = {
  bitcoin: {
    mtd: BitcoinMethods,
    rpc: BitcoinClient
  },
  dkktoken: {
    mtd: DKKTokenMethods,
    rpc: DKKTClient
  },
  ethereum: {
    mtd: EthereumMethods,
    rpc: EthereumClient,
    util: EthereumClient.util
  }
};
