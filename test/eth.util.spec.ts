import { EthereumUtil } from "..";
import { Testing } from "./testing";
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

  Testing(testFunc, testData);
}

{
  // test decodeABINumber
  const testFunc = EthereumUtil.decodeABINumber;
  const testData = [
    {
      expect: 0,
      name: "case 0",
      param: "0x0",
    },
    {
      expect: 2,
      name: "case 2",
      param: "0x2",
    },
    {
      expect: 10,
      name: "case 10",
      param: "0xa",
    },
    {
      expect: NaN,
      name: "case NaN",
      param: "0xxyz",
    },
  ];

  Testing(testFunc, testData);
}

{
  // test decodeABINumber
  const testFunc = EthereumUtil.rmHexPrefix;
  const testData = [
    {
      expect: "0",
      name: "case 0",
      param: "0x0",
    },
    {
      expect: "2",
      name: "case 0x2",
      param: "0x2",
    },
    {
      expect: "a",
      name: "case 0xa",
      param: "0xa",
    },
    {
      expect: "xyz",
      name: "case xyz",
      param: "xyz",
    },
    {
      expect: "0",
      name: "case 0",
      param: "0",
    },
  ];

  Testing(testFunc, testData);
}
