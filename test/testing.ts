import { strictEqual } from "assert";

export function Testing(
  testFunc: any,
  testData: Array<{ expect: any; param: any; name: string }>
) {
  for (const { param, expect, name } of testData) {
    const actual = testFunc(param);
    strictEqual(
      actual,
      expect,
      `${name} test failed want ${expect} but got ${actual}`
    );
  }
}
