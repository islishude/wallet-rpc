import { strictEqual } from "assert";
import { EthereumUtil } from "../src/ethereum/util";

/** spell-checker: disable */
{
  // test decodeABIString
  const testFunc = EthereumUtil.decodeABIString;
  const testData = [
    {
      expect: "BNB",
      name: "BNB",
      param:
        "0x" +
        "0000000000000000000000000000000000000000000000000000000000000020" +
        "0000000000000000000000000000000000000000000000000000000000000003" +
        "424e420000000000000000000000000000000000000000000000000000000000"
    },
    {
      expect: "Engine Token",
      name: "EGCC",
      param:
        "0x" +
        "0000000000000000000000000000000000000000000000000000000000000020" +
        "000000000000000000000000000000000000000000000000000000000000000c" +
        "456e67696e6520546f6b656e0000000000000000000000000000000000000000"
    }
  ];

  for (const { param, expect, name } of testData) {
    const actual = testFunc(param);
    strictEqual(
      actual,
      expect,
      `${name} test failed want ${expect} but got ${actual}`
    );
  }
}
