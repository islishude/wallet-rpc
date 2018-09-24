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
  clear: "\x1b[0m",
  underscore: "\x1b[4m",
  yellow: "\x1b[33m"
  // green: "\x1b[32m",
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

Run with \`npx -n --experimental-repl-await wallet-rpc\` to enable top-level await if you are in the node.js v10 or above.

e.g.
${color.yellow}
  let eth = new EthereumClient();
  await eth.getBlockCount();
${color.clear}
`);

const terminal = start({
  ignoreUndefined: true,
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
  terminal: process.stdout.isTTY,
  useGlobal: true
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
