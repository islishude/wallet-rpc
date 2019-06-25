import test from "ava";
import {
  IBtcBlockchainInfo,
  IBtcBlockInfo,
  IBtcMemPoolInfo,
  IBtcNetworkInfo,
  IBtcTxInfo,
} from "../..";

test("bitcoin type testing", (t) => {
  t.pass();
});

export const BtcTrxInfo: IBtcTxInfo = {
  txid: "6a26d2ecb67f27d1fa5524763b49029d7106e91e3cc05743073461a719776192",
  hash: "6a26d2ecb67f27d1fa5524763b49029d7106e91e3cc05743073461a719776192",
  version: 1,
  size: 123,
  vsize: 123,
  locktime: 0,
  vin: [
    {
      txid: "9c08a4d78931342b37fd5f72900fb9983087e6f46c4a097d8a1f52c74e28eaf6",
      vout: 1,
      scriptSig: {
        asm:
          "5121029b6d2c97b8b7c718c325d7be3ac30f7c9d67651bce0c929f55ee77ce58efcf8451ae",
        hex:
          "255121029b6d2c97b8b7c718c325d7be3ac30f7c9d67651bce0c929f55ee77ce58efcf8451ae",
      },
      sequence: 4294967295,
    },
  ],
  vout: [
    {
      value: 0.0035,
      n: 0,
      scriptPubKey: {
        asm:
          "OP_DUP OP_HASH160 5a3acbc7bbcc97c5ff16f5909c9d7d3fadb293a8 OP_EQUALVERIFY OP_CHECKSIG",
        hex: "76a9145a3acbc7bbcc97c5ff16f5909c9d7d3fadb293a888ac",
        reqSigs: 1,
        type: "pubkeyhash",
        addresses: ["19E6FV3m3kEPoJD5Jz6dGKdKwTVvjsWUvu"],
      },
    },
  ],
  hex: "0x0",
  blockhash: "00000000000002dc756eebf4f49723ed8d30cc28a5f108eb94b1ba88ac4f9c22",
  confirmations: 412319,
  time: 1331137983,
  blocktime: 1331137983,
};

export const BtcBlockInfo: IBtcBlockInfo = {
  hash: "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
  confirmations: 582379,
  strippedsize: 285,
  size: 285,
  weight: 1140,
  height: 0,
  version: 1,
  versionHex: "00000001",
  merkleroot:
    "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
  tx: ["4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b"],
  time: 1231006505,
  mediantime: 1231006505,
  nonce: 2083236893,
  bits: "1d00ffff",
  difficulty: 1,
  chainwork: "0000000000000000000000000000000000000000000000000000000100010001",
  previousblockhash: "0x0",
  nextblockhash:
    "00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048",
};

export const BtcBlockChainInfo: IBtcBlockchainInfo = {
  chain: "main",
  blocks: 582378,
  headers: 582378,
  bestblockhash: "0x0",
  difficulty: 7409399249090.253,
  mediantime: 1561470166,
  verificationprogress: 0.9999947193908962,
  initialblockdownload: false,
  chainwork: "000000000000000000000000000000000000000006d981c6879952c379fc0df3",
  size_on_disk: 256595070865,
  pruned: false,
  softforks: [
    {
      id: "bip34",
      version: 2,
      reject: {
        status: true,
      },
    },
    {
      id: "bip66",
      version: 3,
      reject: {
        status: true,
      },
    },
    {
      id: "bip65",
      version: 4,
      reject: {
        status: true,
      },
    },
  ],
  bip9_softforks: {
    csv: {
      status: "active",
      startTime: 1462060800,
      timeout: 1493596800,
      since: 419328,
    },
    segwit: {
      status: "active",
      startTime: 1479168000,
      timeout: 1510704000,
      since: 481824,
    },
  },
  warnings:
    "Warning: Unknown block versions being mined! It's possible unknown rules are in effect",
};

export const BtcMemPoolInfo: IBtcMemPoolInfo = {
  size: 26327,
  bytes: 12236266,
  usage: 46357216,
  maxmempool: 50000000,
  mempoolminfee: 0.00025557,
  minrelaytxfee: 0.00001,
};

export const BtcNetworkInfo: IBtcNetworkInfo = {
  version: 160000,
  subversion: "/Satoshi:0.16.0(p2pool)/",
  protocolversion: 70015,
  localservices: "000000000000040d",
  localrelay: true,
  timeoffset: 0,
  networkactive: true,
  connections: 24,
  networks: [
    {
      name: "ipv4",
      limited: false,
      reachable: true,
      proxy: "",
      proxy_randomize_credentials: false,
    },
    {
      name: "ipv6",
      limited: false,
      reachable: true,
      proxy: "",
      proxy_randomize_credentials: false,
    },
    {
      name: "onion",
      limited: true,
      reachable: false,
      proxy: "",
      proxy_randomize_credentials: false,
    },
  ],
  relayfee: 0.00001,
  incrementalfee: 0.00001,
  warnings: "",
  localaddresses: [],
};
