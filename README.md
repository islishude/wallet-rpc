JSON RPC client of crypto coins by TypeScript

## Supports

- Bitcoin(core 0.16+)
- BitcoinCash(same with Bitcoin)
- Litecoin(same with Bitcoin)
- Ethereum(geth 1.8.0+ || parity 1.0.0+) and ERC20
- OmniLayer(includes USDT)
- EOS(v1.2.0 stable)

And CLI Supports, [learn more](#cli)!

## TODO Supports

- [ ] Doge

## Install

```shell
# pre-required: Node.js 8.9.x LTS && NPM 5.6+
npm install wallet-rpc --save
```

## Example

```typescript
import {
  IBtcTxInfo,
  BitcoinMethods,
  IRpcRequest,
  BitcoinClient,
  IRpcConfig
} from "wallet-rpc";

const DefaultBtcRpcConf: IRpcConfig = {
  user: "",
  pass: "",
  ip: "http://127.0.0.1",
  // ps. port is `8545` of Ethereum
  port: "8332"
};

const BtcClient = new BitcoinClient(DefaultBtcRpcConf);

// Simple Example
export const example0 = async () => {
  const txid =
    "0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098";
  const { error, result, id } = await BtcClient.getTxInfo(txid);
  if (error !== undefined) {
    // ...
  }
  console.log(id);
  return result;
};

// BulkCall example
export const example1 = async () => {
  const txidList: string[] = [
    "0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098",
    "ce3ab453f96020a32ca382d07967231fa463cf1f365ce4bdc52764faf20371bf"
  ];

  const reqData: IRpcRequest[] = txidList.map((txid, id) => {
    const tmp: IRpcRequest = {
      jsonrpc: "2.0",
      id,
      method: BitcoinMethods.tx.detail,
      params: [txid]
    };
    return tmp;
  });

  const res = await BtcClient.BulkRpcExec<IBtcTxInfo>(reqData);

  for (const { result, error } of res) {
    if (error !== undefined) {
      //...
    }
    console.log("%O", result);
  }
};

// Another BulkCall example(NOT RECOMMEND)
export const example3 = async () => {
  const txidList: string[] = [
    "0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098",
    "ce3ab453f96020a32ca382d07967231fa463cf1f365ce4bdc52764faf20371bf"
  ];

  for (const txid of txidList) {
    const tmp: IRpcRequest = {
      jsonrpc: "2.0",
      id: txid,
      method: BitcoinMethods.tx.detail,
      params: [txid]
    };
    BitClient.BulkAdd(tmp);
  }

  const res = await BtcClient.BulkRpcCall<IBtcTxInfo>();

  for (const { result, error } of res) {
    if (error !== undefined) {
      //...
    }
    console.log("%O", result);
  }
};
```

## API

- [Bitcoin](./types/bitcoin/rpc.d.ts)
- [Ethereum](./types/ethereum/rpc.d.ts)
- [OmniLayer](./types/omni/rpc.d.ts)

[EthereumUtil](./types/ethereum/util.d.ts) includes some useful methods like `getABI`, `toWei`, `toETH`, `isAddress` and so on.

## RPC Methods List

- [Bitcoin](./src/bitcoin/mtd.ts)
- [Ethereum](./src/ethereum/mtd.ts)
- [OmniLayer](./src/omni/mtd.ts)

## CLI

```
npx wallet-rpc

> let eth = new EthereumClient({ ip: "https://mainnet.infura.io", port: "443" });
> let tmp = eth.getBlockCount().then(log, log);
```

for development feature with `npx islishude/wallet-rpc@dev`

## Feedback

- [issue](https://github.com/isLishude/wallet-rpc/issues)
