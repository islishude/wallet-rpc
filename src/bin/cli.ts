#!/usr/bin/env node
import { start } from "repl";
import util = require("util");
import { HttpClient } from "..";
import { BitcoinClient } from "../btc/client";
import { EOSClient } from "../eos/rpc";
import { ERC20Client } from "../eth/erc20";
import { GethClient } from "../eth/geth";
import { ParityClient } from "../eth/parity";
import { USDTClient } from "../usdt/client";

const color = {
  _: "\x1b[4m",
  clear: "\x1b[0m",
  yellow: "\x1b[33m",
};

// inspect large objects
// @ts-ignore
util.inspect.replDefaults.maxArrayLength = Infinity;
// @ts-ignore
util.inspect.replDefaults.depth = Infinity;

console.log(`
Wallet RPC CLI by isLishude <${color._}https://github.com/islishude/wallet-rpc${
  color.clear
}>

The available global variables are

${color.yellow}
- HttpClient(default jsonrpc client)
- BitcoinClient
- USDTClient(entends from BitcoinClient)
- GethClient
- ParityClient(extends from GethClient)
- ERC20Client(injects GethClient or ParityClient)
- EOSClient
${color.clear}

See the README to learn more API and RPC supports list.

Run \`npx -n --experimental-repl-await wallet-rpc\` to enable top-level-await.

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
  useGlobal: true,
  writer(value) {
    return util.inspect(value, {
      showHidden: false,
      depth: null,
      customInspect: true,
      colors: true,
      maxArrayLength: null,
      breakLength: 80,
      compact: false,
      sorted: false,
      // @ts-ignore
      getters: false,
    });
  },
});

terminal.context.HttpClient = HttpClient;
terminal.context.BitcoinClient = BitcoinClient;
terminal.context.USDTClient = USDTClient;
terminal.context.GethClient = GethClient;
terminal.context.ParityClient = ParityClient;
terminal.context.ERC20Client = ERC20Client;
terminal.context.EOSClient = EOSClient;
