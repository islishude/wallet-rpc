#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repl_1 = require("repl");
require("../index");
repl_1.start({
    prompt: "> ",
    input: process.stdin,
    output: process.stdout,
    terminal: process.stdout.isTTY,
    useGlobal: true
});
