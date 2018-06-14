import { assert, log } from "console";
import { Ethereum } from "../src/index";

const Client = new Ethereum.RPC(
  "https://mainnet.infura.io/weSJ3zFGeV2C0gF3Yxpn",
  443
);

const TRX = "0xf230b790e05390fc8295f4d3f60332c93bed42e2";
Client.ERC20TokenInfo(TRX)
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

const HPB = "0x38c6a68304cdefb9bec48bbfaaba5c5b47818bb2";
Client.ERC20TokenInfo(HPB)
  .then(({ decimals, name, totalSupply, symbol }) => {
    assert(decimals === 6);
    assert(name === "HPBCoin");
    assert(symbol === "HPB");
    assert(totalSupply === 1e+26);
  })
  .catch(err => log(err.message));
