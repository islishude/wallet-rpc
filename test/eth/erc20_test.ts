import test from "ava";
import {
  decodeAbiNumber,
  decodeAbiString,
  ERC20Client,
  GethClient,
  HttpClient,
} from "../..";

const jsonrpc = new HttpClient({
  url: "https://mainnet.infura.io/v3/339cbfa2c1814c10b0bc573e34ff4b52",
});

const geth = new GethClient(jsonrpc);
const erc20 = new ERC20Client(geth);
const bnb = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";
const tron = "0xf230b790e05390fc8295f4d3f60332c93bed42e2";

test("decodeAbiString", (t) => {
  const testData = [
    {
      expect: "BNB",
      name: "BNB",
      param:
        "0x" +
        "0000000000000000000000000000000000000000000000000000000000000020" +
        "0000000000000000000000000000000000000000000000000000000000000003" +
        "424e420000000000000000000000000000000000000000000000000000000000",
    },
    {
      expect: "Engine Token",
      name: "EGCC",
      param:
        "0x" +
        "0000000000000000000000000000000000000000000000000000000000000020" +
        "000000000000000000000000000000000000000000000000000000000000000c" +
        "456e67696e6520546f6b656e0000000000000000000000000000000000000000",
    },
  ];

  for (const { expect, name, param } of testData) {
    const got = decodeAbiString(param);
    t.deepEqual(got, expect, name);
  }
});

test("decodeAbiNumber", (t) => {
  const testData = [
    {
      // @ts-ignore
      expect: 0n,
      name: "case 0",
      param: "0x0",
    },
    {
      // @ts-ignore
      expect: 2n,
      name: "case 2",
      param: "0x2",
    },
    {
      // @ts-ignore
      expect: 10n,
      name: "case 10",
      param: "0xa",
    },
  ];

  for (const { expect, name, param } of testData) {
    const got = decodeAbiNumber(param);
    t.deepEqual(got, expect, name);
  }
});

test("ERC20 name", async (t) => {
  const result = await erc20.name(bnb, true);
  const expect = "BNB";
  t.deepEqual(expect, result);
});

test("ERC20 balanceOf", async (t) => {
  const address = "0x9639C636F1ECDA62c6c3d6eb8c1C4A630E184ff7";
  const result = await erc20.balanceOf(bnb, address);

  // @ts-ignore
  const expect = 0n;
  t.deepEqual(expect, result);
});

test("ERC20 symbol", async (t) => {
  const result = await erc20.symbol(bnb);
  const expect = "BNB";
  t.deepEqual(result, expect);
});

test("ERC20 decimals", async (t) => {
  const result = await erc20.decimals(tron);
  // @ts-ignore
  const expect = 6n;
  t.deepEqual(expect, result);
});

test("ERC20 totalSupply", async (t) => {
  const result = await erc20.totalSupply(tron);
  // @ts-ignore
  const expect = 100000000000000000n;
  t.deepEqual(expect, result);
});
