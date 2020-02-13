import test from "ava";
import { decodeAbiNumber, decodeAbiString, } from "../..";

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
