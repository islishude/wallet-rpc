# wallet-rpc [![Build Status](https://travis-ci.org/islishude/wallet-rpc.svg?branch=dev)](https://travis-ci.org/islishude/wallet-rpc)

jsonrpc2.0 client for crypto-currencies by TypeScript

## Supports

### Blockchain clients

- Bitcoin(^BitcoinCore 0.16+)
- TetherUSDT(^OmniLayer0.3.0+)
- Ethereum(^Geth1.8.0 or ^Parity1.0.0)

wallet-rpc v6 has been splited eosrpc to [islishude/eosrpc](https://github.com/islishude/eosrpc)

### Enviorment

Node.js only, v12 is recommend.

## Install

```shell
npm install wallet-rpc --save
```

## REPL

**NPX**

```sh
npx wallet-rpc
```

Run `npx -n --experimental-repl-await wallet-rpc` to enable top-level-await.

**Docker**

```sh
docker run -it --rm islishude/wallet-rpc
```

Supports top-level-await by default.

## Documents

[:books: Document](https://github.com/isLishude/wallet-rpc/blob/dev/doc.md)
