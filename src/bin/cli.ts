#!/usr/bin/env node
import { start } from "repl";
require("../index");

start({
  prompt: "> ",
  input: process.stdin,
  output: process.stdout,
  terminal: process.stdout.isTTY,
  useGlobal: true
});
