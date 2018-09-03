import { ok } from "assert";
import { log } from "console";
import { EthereumUtil } from "../src/ethereum/util";

const { getABI } = EthereumUtil;

const getType = (t: any): string => {
  return Object.prototype.toString.call(t).match(/\s(\w+)/)[1];
};

const test = async () => {
  const TRX = "0xf230b790e05390fc8295f4d3f60332c93bed42e2";
  const data = await getABI(TRX);

  if (data === null) {
    throw new Error("Data isn't null");
  }

  ok(getType(data) === "Array");
  ok(data.length === 17);
};

test().catch(log);
