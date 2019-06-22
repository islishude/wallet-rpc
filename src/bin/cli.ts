#!/usr/bin/env node
import { start } from "repl";
import { BitcoinClient } from "../btc/client";
import { EOSClient } from "../eos/rpc";
import { ERC20Client } from "../eth/erc20";
import { GethClient } from "../eth/geth";
import { ParityClient } from "../eth/parity";

const color = {
  _: "\x1b[4m",
  clear: "\x1b[0m",
  yellow: "\x1b[33m",
};

console.log(`
Wallet RPC CLI by isLishude <${color._}https://github.com/islishude/wallet-rpc${
  color.clear
}>

The available global variables are

${color.yellow}
- log(alias "console.log")
- EthereumClient
- EthereumClient
- EOSClient
- ...
${color.clear}

See the README to learn more API and RPC supports list.

Run \`npx -n --experimental-repl-await wallet-rpc\` to enable top-level-await with node.js v10 LTS.

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
});

const MyConsole = new console.Console({
  // @ts-ignore
  inspectOptions: { depth: null, color: true },
  stderr: process.stderr,
  stdout: process.stdout,
});

terminal.context.log = MyConsole.log.bind(MyConsole);
terminal.context.BitcoinClient = BitcoinClient;
terminal.context.GethClient = GethClient;
terminal.context.ParityClient = ParityClient;
terminal.context.ERC20Client = ERC20Client;
terminal.context.EOSClient = EOSClient;
