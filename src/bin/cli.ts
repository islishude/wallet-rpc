#!/usr/bin/env node
import { log } from "console";
import { start } from "repl";
import {
  BitcoinClient,
  BitcoinMethods,
  DKKTClient,
  DKKTokenMethods,
  EthereumClient,
  EthereumMethods,
  EthereumUtil,
  OmniLayerClient,
  OmniLayerMethods
} from "../index";

const color = {
  yellow: "\x1b[33m",
  // green: "\x1b[32m",
  clear: "\x1b[0m",
  underscore: "\x1b[4m"
};

log(`
Wallet RPC CLI by isLishude <${
  color.underscore
}https://github.com/islishude/wallet-rpc${color.clear}>

The available global variable are

${color.yellow}
- log(alias "console.log")
- Bitcoin 
- Ethereum 
- ...
${color.clear} 

See the README to learn more API and RPC supports list.

e.g.
${color.yellow}
  const eth = new Ethereum.RPC("https://mainnet.infura.io", 443);
  let tmp = eth.getBlockCount().then(log, e => log(e.message));
${color.clear}
`);

const terminal = start({
  prompt: "> ",
  input: process.stdin,
  output: process.stdout,
  terminal: process.stdout.isTTY,
  useGlobal: true,
  ignoreUndefined: true
});

terminal.context.log = log;

terminal.context.BitcoinClient = BitcoinClient;
terminal.context.BitcoinMethods = BitcoinMethods;

terminal.context.EthereumClient = EthereumClient;
terminal.context.EthereumMethods = EthereumMethods;
terminal.context.EthereumUtil = EthereumUtil;

terminal.context.DKKTClient = DKKTClient;
terminal.context.DKKTokenMethods = DKKTokenMethods;

terminal.context.OmniLayerClient = OmniLayerClient;
terminal.context.OmniLayerMethods = OmniLayerMethods;
