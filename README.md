MultiCryptoCoins RPC Lib by TypeScript for Node.js

## Supports

* Bitcoin(0.16+)
* Ethereum(1.8.0+) and ERC20
* DKKToken

## TODO Supports

- [ ] Bitcoin Cash
- [ ] LiteCoin
- [ ] EOS

## Install

```shell
# PRE-REQUIRED: Node.js 8.x && NPM 5.6+
npm install wallet-rpc --save
```

## Usage

### CommonJS

```js
const { bitcoin, ethereum, dkktoken } = require("wallet-rpc");
// get rpc and rpc methods by this
const { rpc: btcRpc, mtd: btcMtd } = bitcoin;
const btcClient = new btcRpc("username", "password", "ip");
btcClient
  .getTxInfo("txid")
  .then(txInfo => console.log)
  .catch(console.log);
// ...
```

### TypeScript

```typescript
import { bitcoin, ethereum, dkktoken } from "wallet-rpc";
const { rpc: btcRpc, mtd: btcMtd } = bitcoin;
```

### API

* [Bitcoin API](./types/bitcoin/rpc.d.ts)
* [Ethereum API](./types/bitcoin/rpc.d.ts)
* [DKKToken API](./types/bitcoin/rpc.d.ts)

## Feedback

- [issue](https://github.com/isLishude/wallet-rpc/issues)