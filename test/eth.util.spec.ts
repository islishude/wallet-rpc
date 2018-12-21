import { strictEqual } from "assert";
import { EthereumUtil } from "../src/ethereum/util";

/** spell-checker: disable */
{
  const testFunc = EthereumUtil.decodeABIString;
  {
    // BNB
    const raw =
      "0x000000000000000000000000000000000000000000000000000000000000002" +
      "00000000000000000000000000000000000000000000000000000000000000003" +
      "424e420000000000000000000000000000000000000000000000000000000000";
    const actual = testFunc(raw);
    const expect = "BNB";
    strictEqual(actual, expect, "BNB failed");
  }

  {
    // EGCC
    const raw =
      "0x000000000000000000000000000000000000000000000000000000000000002" +
      "0000000000000000000000000000000000000000000000000000000000000000c" +
      "456e67696e6520546f6b656e0000000000000000000000000000000000000000";
    const actual = testFunc(raw);
    const expect = "Engine Token";
    strictEqual(actual, expect, "EGCC faild");
  }
}
