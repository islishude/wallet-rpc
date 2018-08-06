#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const repl_1 = require("repl");
const index_1 = require("../index");
const color = {
    yellow: "\x1b[33m",
    green: "\x1b[32m",
    clear: "\x1b[0m",
    underscore: "\x1b[4m"
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

e.g.
${color.yellow}
  const eth = new Ethereum.RPC("https://mainnet.infura.io", 443);
  let tmp = eth.getBlockCount().then(log, e => log(e.message));
${color.clear}
`);
const terminal = repl_1.start({
    prompt: "> ",
    input: process.stdin,
    output: process.stdout,
    terminal: process.stdout.isTTY,
    useGlobal: true,
    ignoreUndefined: true
});
terminal.context.log = console_1.log;
terminal.context.Bitcoin = index_1.Bitcoin;
terminal.context.Ethereum = index_1.Ethereum;
terminal.context.DKKToken = index_1.DKKToken;
