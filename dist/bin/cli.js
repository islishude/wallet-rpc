#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repl_1 = require("repl");
const index_1 = require("../index");
const terminal = repl_1.start({
    prompt: "> ",
    input: process.stdin,
    output: process.stdout,
    terminal: process.stdout.isTTY,
    useGlobal: true
});
terminal.context.Bitcoin = index_1.Bitcoin;
terminal.context.Ethereum = index_1.Ethereum;
terminal.context.DKKToken = index_1.DKKToken;
