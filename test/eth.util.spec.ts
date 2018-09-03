import { ok } from "assert";
import { EthereumUtil } from "../src/ethereum/util";

const { hexToDecimalString } = EthereumUtil;
{
  // hexToDecimalString testing
  const test1 = hexToDecimalString("0x") === "0";
  const test2 = hexToDecimalString("f") === "15";
  const test3 = hexToDecimalString("0xf") === "15";

  ok(test1, "0x");
  ok(test2, "f");
  ok(test3, "0xf");
}
