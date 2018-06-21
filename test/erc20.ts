import { assert, log } from "console";
import { Ethereum } from "../src/index";
/* spell-checker: disable */

const Client = new Ethereum.RPC(
  "https://mainnet.infura.io/weSJ3zFGeV2C0gF3Yxpn",
  443,
  "",
  "",
  true
);

const TRX = "0xf230b790e05390fc8295f4d3f60332c93bed42e2";
Client.ERC20TokenInfo(TRX)
  .then(({ decimals, name, totalSupply, symbol }) => {
    log(decimals, name, symbol, totalSupply);
    assert(decimals === 6);
    assert(name === "Tronix");
    assert(symbol === "TRX");
    assert(totalSupply === "100000000000000000");
  })
  .catch(err => log(err.message));

const HPB = "0x38c6a68304cdefb9bec48bbfaaba5c5b47818bb2";
Client.ERC20TokenInfo(HPB)
  .then(({ decimals, name, totalSupply, symbol }) => {
    log(decimals, name, symbol, totalSupply);
    assert(decimals === 18);
    assert(name === "HPBCoin");
    assert(symbol === "HPB");
    assert(totalSupply === "100000000000000000000000000");
  })
  .catch(err => log(err.message));

const EGCC = "0xaf8a215e81faea7c180ce22b72483525121813bd";
Client.ERC20TokenInfo(EGCC)
  .then(({ decimals, name, totalSupply, symbol }) => {
    log(decimals, name, symbol, totalSupply);
    assert(decimals === 18);
    assert(name === "EngineToken");
    assert(symbol === "EGCC");
    assert(totalSupply === "10000000000000000000000000000");
  })
  .catch(err => log(err.message));
