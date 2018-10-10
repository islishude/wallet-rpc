JSON RPC client of crypto coins by TypeScript

## Supports

- Bitcoin(core 0.16+)
- BitcoinCash(same with Bitcoin)
- Litecoin(same with Bitcoin)
- Ethereum(geth 1.8.0+ || parity 1.0.0+) and ERC20
- OmniLayer(includes USDT)
- EOS(v1.3.0 stable)

the EOS type defined in progressing,PR welcome!

And CLI Supports, [learn more](#cli)

## Install

```shell
# pre-required: Node.js 8.9.x LTS && NPM 5.6+
npm install wallet-rpc --save
```

## API

- [Bitcoin](./types/bitcoin/rpc.d.ts)
- [Ethereum](./types/ethereum/rpc.d.ts)
- [OmniLayer](./types/omni/rpc.d.ts)
- [EOS](./types/eos/rpc.d.ts)

[EthereumUtil](./types/ethereum/util.d.ts) includes some useful methods like `getABI`, `toWei`, `toETH`, `isAddress` and so on.

for v3 users,v4 has been remove `sha3` and `isChecksumAddress`,you can import [those](./example/sha3.ts) by self.

## RPC Methods List

- [Bitcoin](./src/bitcoin/mtd.ts)
- [Ethereum](./src/ethereum/mtd.ts)
- [OmniLayer](./src/omni/mtd.ts)

## Example

- [Bitcoin](./example/bitcoin.ts)
- [Ethereum](./example/ethereum.ts)
- [OmniLayer](./example/omnis.ts)

## CLI

```
npx wallet-rpc

> let eth = new EthereumClient({ ip: "https://mainnet.infura.io", port: "443" });
> let tmp = eth.getBlockCount().then(log, log);
```

Run with `npx -n --experimental-repl-await wallet-rpc` to enable top-level await if you are in the node.js v10 or above.

for development feature with `npx islishude/wallet-rpc@dev`

## Feedback

- [issue](https://github.com/isLishude/wallet-rpc/issues)
