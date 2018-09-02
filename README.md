JSON RPC client of crypto coins by TypeScript

## Supports

- Bitcoin(core 0.16+)
- BitcoinCash(same with Bitcoin)
- Litecoin(same with Bitcoin)
- Ethereum(geth 1.8.0+ || parity 1.0.0+) and ERC20
- OmniLayer(includes USDT)

And CLI Supports, [learn more](#cli)!

## TODO Supports

- [ ] EOS

## Install

```shell
# pre-required: Node.js 8.9.x LTS && NPM 5.6+
npm install wallet-rpc --save
```

## Usage

### CommonJS

```js
import { BitcoinClient } from "wallet-rpc";
const DefaultBtcRpcConf = {
  user: "",
  pass: "",
  ip: "http://127.0.0.1",
  port: "8332"
};
const btcClient = new BitcoinClient(DefaultBtcRpcConf);
btcClient
  .getTxInfo("txid")
  .then(txInfo => console.log)
  .catch(console.log);
// ...
// BulkCall see flow
```

### TypeScript

```typescript
import { IBtcTxInfo, BitcoinMethods as BtcMtd } from "wallet-rpc";
// Bulk Call
btcClient
  // your can set generic `T` and return `IRpcResponse<T[]>`
  .bulkRpcExec<IBtcTxInfo>([{
    id: 0,
    jsonrpc: "2.0",
    method: BtcMtd.tx.detail
    params: ["0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098"]
  },{
    id: 1,
    jsonrpc: "2.0",
    method: BtcMtd.tx.detail
    params: ["ce3ab453f96020a32ca382d07967231fa463cf1f365ce4bdc52764faf20371bf"]
  }])

// Also can
btcClient.BulkAdd(Bitcoin.mtd.block.hash, [100], 0);
btcClient.BulkAdd(Bitcoin.mtd.block.hash, [200], 1);
btcClient.BulkCall();
```

## API

- [Bitcoin](./types/bitcoin/rpc.d.ts)
- [Ethereum && ERC20](./types/ethereum/rpc.d.ts)
- [EthereumUtil](./types/ethereum/util.d.ts)
- [OmniLayer(USDT)](./types/omni/rpc.d.ts)

Ethereum Util includes some useful methods like `getABI`, `sha3`.

## RPC Methods List

- [Bitcoin](./src/bitcoin/mtd.ts)
- [Ethereum](./src/ethereum/mtd.ts)
- [OmniLayer(USDT)](./src/omni/mtd.ts)

## CLI

```
npx wallet-rpc

> let eth = new EthereumClient("https://mainnet.infura.io", 443);
> let tmp = eth.getBlockCount(log, log(e => e.message));
```

for development feature with `npx islishude/wallet-rpc@dev`

## Feedback

- [issue](https://github.com/isLishude/wallet-rpc/issues)
