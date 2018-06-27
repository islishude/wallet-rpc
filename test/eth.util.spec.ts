import { ok } from "assert";
import { hexToDecimalString } from "../src/ethereum/util";

{
  // hexToDecimalString testing
  const test1 = hexToDecimalString("0x") === "0";
  const test2 = hexToDecimalString("f") === "15";
  const test3 = hexToDecimalString("0xf") === "15";

  ok(test1, "0x");
  ok(test2, "f");
  ok(test3, "0xf");
}
