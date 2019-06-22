#!/usr/bin/env node
import { log } from "console";
import { start } from "repl";
import { BitcoinMethods } from "../bitcoin/mtd";
import { BitcoinClient } from "../bitcoin/rpc";
import { EOSMethods } from "../eos/mtd";
import { EOSClient } from "../eos/rpc";
import { EthereumMethods } from "../ethereum/mtd";
import { EthereumClient } from "../ethereum/rpc";
import { EthereumUtil } from "../ethereum/util";
import { OmniLayerMethods } from "../omni/mtd";
import { OmniLayerClient } from "../omni/rpc";

const color = {
  _: "\x1b[4m",
  clear: "\x1b[0m",
  yellow: "\x1b[33m",
};

log(`
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
terminal.context.BitcoinMethods = BitcoinMethods;

terminal.context.EthereumClient = EthereumClient;
terminal.context.EthereumMethods = EthereumMethods;
terminal.context.EthereumUtil = EthereumUtil;

terminal.context.OmniLayerClient = OmniLayerClient;
terminal.context.OmniLayerMethods = OmniLayerMethods;

terminal.context.EOSClient = EOSClient;
terminal.context.EOSMethods = EOSMethods;
