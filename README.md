MultiCryptoCoins RPC Lib by TypeScript for Node.js

## Supports

- Bitcoin(core 0.16+)
- Ethereum(geth 1.8.0+) and ERC20
- DKKToken

And CLI Supports, [learn more](#cli)!

## TODO Supports

- [ ] BitcoinCash
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
import { Bitcoin, Ethereum, DKKToken } from "wallet-rpc";
// the default rpc port of bitcoin is 8332
const btcClient = new Bitcoin.RPC("username", "password", "ip", 8832);
// the default rpc of geth has no username and no password
// if you config the proxy you can pass them to constructor.
// the param order is ip-port-username-password
const ethClient = new Ethereum.RPC("ip");
btcClient
  .getTxInfo("txid")
  .then(txInfo => console.log)
  .catch(console.log);
// ...
// BulkCall see flow
```

### TypeScript

```typescript
// Bulk Call
btcClient
  // your can set generic
  // and return `type[]`
  // the types can import from defined/*.d.ts
  .bulkRpcExec<string>([{
    id: 0,
    jsonrpc: "2.0",
    method: btcMtd.block.hash
    params: [0]
  },{
    id: 1,
    jsonrpc: "2.0",
    method: btcMtd.block.hash
    params: [1]
  }])
  .then(console.log)
  .catch(console.log);

// Also can
btcClient.BulkAdd(Bitcoin.mtd.block.hash, [0], 0);
btcClient.BulkAdd(Bitcoin.mtd.block.hash, [1], 1);
btcClient.BulkCall();
```

### API

- [Bitcoin](./types/bitcoin/rpc.d.ts)
- [Ethereum](./types/ethereum/rpc.d.ts)
- [DKKToken](./types/dkktoken/rpc.d.ts)

#### EthereumUtil

```typescript
// ethereum.util....
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
}
hexToNumber: (hex: string) => number;
isAddress: (address: string) => boolean;
isChecksumAddress: (address: string) => boolean;
numberToHex: (int: number) => string;
sha3: (message: string) => string;
```

#### ERC20

```typescript
// eg.new Ethereum.RPC().ERC20Balance("TokenAddress", "Address")
ERC20Balance(token: string, address: string, isPending?: boolean): Promise<string>;
ERC20Decimals(token: string): Promise<number>;
ERC20TotalSupply(token: string): Promise<number>;
ERC20Name(token: string): Promise<string>;
ERC20Symbol(token: string): Promise<string>;
ERC20TokenInfo(token: string): Promise<{
    decimals: number;
    name: string;
    symbol: string;
    totalSupply: number;
}>;
```

### CLI
```
npx wallet-rpc
# or run `npm i -g wallet-rpc`
# and CLI ready for you!
> const eth = new Ethereum.RPC("https://mainnet.infura.io", 443)
> eth.getBlockCount()
```

### RPC Methods List

- [Bitcoin](./src/bitcoin/mtd.ts)
- [Ethereum](./src/ethereum/mtd.ts)
- [DKKToken](./src/dkktoken/mtd.ts)

## Feedback

- [issue](https://github.com/isLishude/wallet-rpc/issues)
