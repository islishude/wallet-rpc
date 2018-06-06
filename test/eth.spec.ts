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

Client.ERC20Balance("0xdd974d5c2e2928dea5f71b9825b8b646686bd200", "0xa17688349750954506ed2429b7e09cc83fa79a9a", false)
  .then(log)
  .catch(err => log(err.message));
