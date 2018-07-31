#!/usr/bin/env node
import { start } from "repl";
import { Bitcoin, DKKToken, Ethereum } from "../index";

const terminal = start({
  prompt: "> ",
  input: process.stdin,
  output: process.stdout,
  terminal: process.stdout.isTTY,
  useGlobal: true
});

terminal.context.Bitcoin = Bitcoin;
terminal.context.Ethereum = Ethereum;
terminal.context.DKKToken = DKKToken;
