import { BitcoinMethods } from "./bitcoin/mtd";
import { BitcoinClient } from "./bitcoin/rpc";
import { DKKTokenMethods } from "./dkktoken/mtd";
import { DKKTClient } from "./dkktoken/rpc";
import { EthereumMethods } from "./ethereum/mtd";
import { EthereumClient } from "./ethereum/rpc";
import * as EthereumUtil from "./ethereum/util";
import { OmniLayerMethods } from "./omni/mtd";
import { OmniLayerClient } from "./omni/rpc";

export const Bitcoin = { mtd: BitcoinMethods, RPC: BitcoinClient };
export const Ethereum = {
  RPC: EthereumClient,
  mtd: EthereumMethods,
  util: EthereumUtil
};
export const DKKToken = { mtd: DKKTokenMethods, RPC: DKKTClient };
export const OmniLayer = { mtd: OmniLayerMethods, RPC: OmniLayerClient };
