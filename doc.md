## API

- [Bitcoin](./types/bitcoin/rpc.d.ts)
- [Ethereum](./types/ethereum/rpc.d.ts)
- [OmniLayer](./types/omni/rpc.d.ts)
- [EOS](./types/eos/rpc.d.ts)

[EthereumUtil](./types/ethereum/util.d.ts) includes some useful methods like `getABI`, `toWei`, `toETH`, `isAddress` and so on.

for v3 users,v4 has been remove `sha3` and `isChecksumAddress`,you can import [those](./example/sha3.ts) by yourself.

### EOS Actions

- [eosio.token](https://github.com/isLishude/eos-actions-types/blob/master/eosio.token.d.ts)
- [eosio](https://github.com/isLishude/eos-actions-types/blob/master/eosio.d.ts)

## RPC Methods List

- [Bitcoin](./src/bitcoin/mtd.ts)
- [Ethereum](./src/ethereum/mtd.ts)
- [OmniLayer](./src/omni/mtd.ts)

## Error Type

If request call has any errors or response status code is not 200, will throw flow error.The `message` field is a string which merges `request` and `response` field.

```typescript
interface IWalletRpcError {
  reason: string;
  message: string;
  request: {
    coinName: string;
    url: string;
    data: any;
  };
  response?: any;
  statusCode?: number;
}
```

## Example

- [Bitcoin](./example/bitcoin.ts)
- [Ethereum](./example/ethereum.ts)
- [OmniLayer](./example/omni.ts)
