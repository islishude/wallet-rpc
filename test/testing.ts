export function Testing(
  testFunc: any,
  testData: Array<{ expect: any; param: any; name: string }>
) {
  for (const { param, expect, name } of testData) {
    const actual = testFunc(param);

    if (!Object.is(actual, expect)) {
      throw new Error(`${name} test failed want ${expect} but got ${actual}`);
    }
  }
}
