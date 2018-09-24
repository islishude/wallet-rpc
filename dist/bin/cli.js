#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const repl_1 = require("repl");
const index_1 = require("../index");
const color = {
    clear: "\x1b[0m",
    underscore: "\x1b[4m",
    yellow: "\x1b[33m"
    // green: "\x1b[32m",
};
console_1.log(`
Wallet RPC CLI by isLishude <${color.underscore}https://github.com/islishude/wallet-rpc${color.clear}>

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
const terminal = repl_1.start({
    ignoreUndefined: true,
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
    terminal: process.stdout.isTTY,
    useGlobal: true
});
terminal.context.log = console_1.log;
terminal.context.BitcoinClient = index_1.BitcoinClient;
terminal.context.BitcoinMethods = index_1.BitcoinMethods;
terminal.context.EthereumClient = index_1.EthereumClient;
terminal.context.EthereumMethods = index_1.EthereumMethods;
terminal.context.EthereumUtil = index_1.EthereumUtil;
terminal.context.DKKTClient = index_1.DKKTClient;
terminal.context.DKKTokenMethods = index_1.DKKTokenMethods;
terminal.context.OmniLayerClient = index_1.OmniLayerClient;
terminal.context.OmniLayerMethods = index_1.OmniLayerMethods;
