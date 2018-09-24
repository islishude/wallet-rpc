#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const repl_1 = require("repl");
const mtd_1 = require("../bitcoin/mtd");
const rpc_1 = require("../bitcoin/rpc");
const mtd_2 = require("../dkktoken/mtd");
const rpc_2 = require("../dkktoken/rpc");
const mtd_3 = require("../eos/mtd");
const rpc_3 = require("../eos/rpc");
const mtd_4 = require("../ethereum/mtd");
const rpc_4 = require("../ethereum/rpc");
const util_1 = require("../ethereum/util");
const mtd_5 = require("../omni/mtd");
const rpc_5 = require("../omni/rpc");
const color = {
    _: "\x1b[4m",
    clear: "\x1b[0m",
    yellow: "\x1b[33m"
    // green: "\x1b[32m",
};
console_1.log(`
Wallet RPC CLI by isLishude <${color._}https://github.com/islishude/wallet-rpc${color.clear}>

The available global variable are

${color.yellow}
- log(alias "console.log")
- Bitcoin 
- Ethereum 
- EOS
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
terminal.context.BitcoinClient = rpc_1.BitcoinClient;
terminal.context.BitcoinMethods = mtd_1.BitcoinMethods;
terminal.context.EthereumClient = rpc_4.EthereumClient;
terminal.context.EthereumMethods = mtd_4.EthereumMethods;
terminal.context.EthereumUtil = util_1.EthereumUtil;
terminal.context.DKKTClient = rpc_2.DKKTClient;
terminal.context.DKKTokenMethods = mtd_2.DKKTokenMethods;
terminal.context.OmniLayerClient = rpc_5.OmniLayerClient;
terminal.context.OmniLayerMethods = mtd_5.OmniLayerMethods;
terminal.context.EOSClient = rpc_3.EOSClient;
terminal.context.EOSMethods = mtd_3.EOSMethods;
