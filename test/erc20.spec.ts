import { equal } from "assert";
import { log } from "console";
import { EthereumClient } from "../src";
/* spell-checker: disable */

const Client = new EthereumClient({
  ip: "https://mainnet.infura.io",
  port: "443"
});

const TRX = "0xf230b790e05390fc8295f4d3f60332c93bed42e2";
Client.ERC20TokenInfo(TRX)
  .then(({ decimals, name, totalSupply, symbol }) => {
    log(decimals, name, symbol, totalSupply);
    equal(decimals, 6);
    equal(name, "Tronix");
    equal(symbol, "TRX");
    equal(totalSupply, "100000000000");
  })
  .catch(err => log(err.message));

const HPB = "0x38c6a68304cdefb9bec48bbfaaba5c5b47818bb2";
Client.ERC20TokenInfo(HPB)
  .then(({ decimals, name, totalSupply, symbol }) => {
    log(decimals, name, symbol, totalSupply);
    equal(decimals, 18);
    equal(name, "HPBCoin");
    equal(symbol, "HPB");
    equal(totalSupply, "100000000");
  })
  .catch(err => log(err.message));

const EGCC = "0xaf8a215e81faea7c180ce22b72483525121813bd";
Client.ERC20TokenInfo(EGCC)
  .then(({ decimals, name, totalSupply, symbol }) => {
    log(decimals, name, symbol, totalSupply);
    equal(decimals, 18);
    equal(name, "EngineToken");
    equal(symbol, "EGCC");
    equal(totalSupply, "10000000000");
  })
  .catch(err => log(err.message));

const NON_ERC20_TOKEN = "0xce44c75d3c2864421df2a1d2f068d8da8375f579";
Client.ERC20TokenInfo(NON_ERC20_TOKEN)
  .then(({ decimals, name, totalSupply, symbol }) => {
    log(decimals, name, symbol, totalSupply);
    equal(decimals, undefined);
    equal(name, undefined);
    equal(symbol, undefined);
    equal(totalSupply, undefined);
  })
  .catch(err => log(err.message));
