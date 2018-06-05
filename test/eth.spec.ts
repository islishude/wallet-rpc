import { assert, log } from "console";
import { CoinRpc } from "../src/index";

const Client = new CoinRpc.ethereum.rpc(
  "https://mainnet.infura.io/weSJ3zFGeV2C0gF3Yxpn",
  443
);

Client.ERC20TokenInfo("0xf230b790e05390fc8295f4d3f60332c93bed42e2")
  .then(({ decimals, name, totalSupply, symbol }) => {
    // log(decimals, name, symbol, totalSupply);
    assert(decimals === 6);
    /* spell-checker: disable */
    assert(name === "Tronix");
    assert(symbol === "TRX");
    /* spell-checker: enable */
    assert(totalSupply === 100000000000000000);
  })
  .catch(err => log(err.message));

Client.getTxByHash(
  "0xca40770425e92c10b7717cdf6881d0309ee496f3f51e240abc7e8624c005c14c"
)
  .then(({ result }) => {
    const {
      blockHash,
      blockNumber,
      from,
      gas,
      gasPrice,
      hash,
      input,
      nonce,
      to,
      transactionIndex,
      value
    } = result;
    assert(
      blockHash ===
        "0x00040a5668b65cfae9a7432d08ac44d22f2065469df85360887cc0888203753d"
    );
  })
  .catch(err => log(err.message));

Client.getTxReceipt(
  "0xca40770425e92c10b7717cdf6881d0309ee496f3f51e240abc7e8624c005c14c"
).then(({ result }) => {
  log("%o", result)
});
